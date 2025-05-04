using System;
using Microsoft.EntityFrameworkCore;
using Domain;
using MediatR;
using Persistence;
using Microsoft.Extensions.Logging;

namespace Application.Activities.Queries;

public class GetActivityList
{
  public class Query : IRequest<IEnumerable<Activity>> { }

  public class Handler(AppDbContext context) : IRequestHandler<Query, IEnumerable<Activity>>
  {
    public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
    {
      // try
      // {
      //   for (int i = 0; i < 10; i++)
      //   {
      //     cancellationToken.ThrowIfCancellationRequested();
      //     await Task.Delay(1000, cancellationToken);
      //     logger.LogInformation($"Task {i} has completed");
      //   }
      // }
      // catch (Exception)
      // {
      //   logger.LogError("Task was Cancelled");
      // }
      return await context.Activities.ToListAsync(cancellationToken);
    }
  }
}
