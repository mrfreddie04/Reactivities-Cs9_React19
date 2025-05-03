using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
  options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
// builder.Services.AddCors(options =>
// {
//   options.AddDefaultPolicy(policyBuilder =>
//   {
//     policyBuilder.WithOrigins(builder.Configuration.GetValue<string>("ClientUrl"))
//       .AllowAnyMethod()
//       .AllowAnyHeader();
//   });				
// });	

var app = builder.Build();

// Configure the HTTP request pipeline.
//app.UseAuthorization();

app.UseCors( options =>
{
  options.WithOrigins("http://localhost:3000","https://localhost:3000")
      .AllowAnyMethod()
      .AllowAnyHeader();	  
});

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;
  try
  {
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync(); //create db & apply pending migrations
    await DbInitializer.SeedDataAsync(context); //seed data
  }
  catch (Exception ex)
  {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
  }
}

app.Run();
