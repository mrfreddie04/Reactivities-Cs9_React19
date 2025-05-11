using System;
using MediatR;
using Domain;
using Persistence;
using AutoMapper;
using Application.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Commands;

public class EditActivity
{
  public class Command : IRequest<Result<Unit>>
  {
    public required EditActivityDto ActivityDto { get; init; }
  }

  public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command,Result<Unit>>
  {
    public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
    {
      var activity = await context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken: cancellationToken);

      if (activity is null)
      {
        return Result<Unit>.Failure("Activity not found", 404);
      }

      mapper.Map(request.ActivityDto, activity);

      var isSuccess = (await context.SaveChangesAsync(cancellationToken)) > 0;

      if(!isSuccess)
      {
        return Result<Unit>.Failure("Failed to update the activity", 400);
      }

      return Result<Unit>.Success(Unit.Value);
    }
  }
}
