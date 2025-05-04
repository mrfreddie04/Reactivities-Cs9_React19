using System;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Domain;
using Application.Activities.Queries;
using Application.Activities.Commands;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Activity>>> GetActivities(CancellationToken cancellationToken)
  {
    var activities = await Mediator.Send(new GetActivityList.Query(),cancellationToken);
    return Ok(activities);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Activity>> GetActivityDetailById([FromRoute] string id)
  {
    var activity = await Mediator.Send(new GetActivityDetails.Query() { Id = id });
    return Ok(activity);
  }

  [HttpPost]
  public async Task<ActionResult<string>> CreateActivity([FromBody] Activity activity)
  {
    var id = await Mediator.Send(new CreateActivity.Command() { Activity = activity });
    return Ok(id);
  }

  [HttpPut]
  public async Task<ActionResult> EditActivity([FromBody] Activity activity)
  {
    await Mediator.Send(new EditActivity.Command() { Activity = activity });
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteActivity([FromRoute] string id)
  {
    await Mediator.Send(new DeleteActivity.Command() { Id = id });
    return Ok();
  }
}

