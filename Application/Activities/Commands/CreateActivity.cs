using System;
using MediatR;
using Domain;
using Persistence;
using Application.Activities.DTOs;
using AutoMapper;
using Application.Core;

namespace Application.Activities.Commands;

public class CreateActivity
{
  public class Command : IRequest<Result<string>>
  { 
    public required CreateActivityDto ActivityDto { get; init;}
  }

  public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
  {
    public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
    {
      var activity = mapper.Map<CreateActivityDto, Activity>(request.ActivityDto);

      context.Activities.Add(activity);

      var isSuccess = (await context.SaveChangesAsync(cancellationToken)) > 0;

      if(!isSuccess)
      {
        return Result<string>.Failure("Failed to create the activity", 400);
      }

      return Result<string>.Success(activity.Id);
    }
  }
}
