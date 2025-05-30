using System;
using MediatR;
using Domain;
using Persistence;
using Application.Core;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
  public class Query : IRequest<Result<Activity>>
  {
    public required string Id { get; init; }
  }

  public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
  {
    public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
    {
      var activity = await context.Activities.FindAsync([request.Id], cancellationToken: cancellationToken);

      if (activity is null)
      {
        //throw new ArgumentException("Activity not found");
        return Result<Activity>.Failure("Activity not found", 404);
      }

      return Result<Activity>.Success(activity);
    }
  }
}
