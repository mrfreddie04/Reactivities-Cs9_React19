using System;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
  {
    var activities = await context.Activities.ToListAsync();
    return Ok(activities);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Activity>> GetActivityDetailById([FromRoute] string id )
  {
    var activity = await context.Activities.FindAsync(id);

    if (activity is null)
    {
      return NotFound("Activity not found");
    }

    return Ok(activity);
  }
}

