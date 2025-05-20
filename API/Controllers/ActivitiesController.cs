using System;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Activity>>> GetActivities(CancellationToken cancellationToken)
  {
    return Ok(await Mediator.Send(new GetActivityList.Query(),cancellationToken));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Activity>> GetActivityDetailById([FromRoute] string id)
  {
    //throw new Exception("Server test error");
    
    return HandleResult(await Mediator.Send(new GetActivityDetails.Query() { Id = id }));
  }

  [HttpPost]
  public async Task<ActionResult<string>> CreateActivity([FromBody] CreateActivityDto activityDto)
  {
    return HandleResult(await Mediator.Send(new CreateActivity.Command() { ActivityDto = activityDto }));
  }

  [HttpPut]
  public async Task<ActionResult> EditActivity([FromBody] EditActivityDto activity)
  {
    return HandleResult(await Mediator.Send(new EditActivity.Command() { ActivityDto = activity }));
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteActivity([FromRoute] string id)
  {
    return HandleResult(await Mediator.Send(new DeleteActivity.Command() { Id = id }));
  }
}

