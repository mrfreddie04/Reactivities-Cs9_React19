using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
  public string Title { get; init; } = string.Empty;
  public DateTime Date { get; init; }
  public string Description { get; init; } = string.Empty;
  public string Category { get; init; } = string.Empty;
  public string City { get; init; } = string.Empty;
  public string Venue { get; init; } = string.Empty;
  public double Latitude { get; init; }
  public double Longitude { get; init; }
}
