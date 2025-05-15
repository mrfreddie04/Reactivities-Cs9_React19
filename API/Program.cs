using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Activities.Queries;
using Application.Core;
using Application.Activities.Validators;
using Persistence;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => {
  var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
  options.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddCors();

builder.Services.AddDbContext<AppDbContext>(options =>
{
  options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddMediatR(configuration =>
{
  configuration.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
  configuration.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

builder.Services.AddTransient<IMiddleware, ExceptionMiddleware>(); 

builder.Services.AddIdentityApiEndpoints<User>(options => {
  options.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
//app.UseAuthorization();
app.UseMiddleware<IMiddleware>();

app.UseCors( options =>
{
  options.WithOrigins("http://localhost:3000","https://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();	  
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;
  try
  {
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync(); //create db & apply pending migrations
    await DbInitializer.SeedDataAsync(context); //seed data
    await DbInitializer.SeedUsersAsync(userManager); //seed users
  }
  catch (Exception ex)
  {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
  }
}

app.Run();
