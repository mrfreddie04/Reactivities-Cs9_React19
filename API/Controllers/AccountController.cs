using System;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager): BaseApiController
{
  
  [AllowAnonymous]
  [HttpGet("user-info")]
  public async Task<ActionResult<UserDto>> GetUserInfo() 
  {
    if(User?.Identity?.IsAuthenticated != true) 
    {
      return NoContent();
    }

    var user = await signInManager.UserManager.GetUserAsync(User);

    if(user is null)
    {
      return Unauthorized();
    }

    var userDto = new UserDto() 
    {
      Id = user.Id,
      DisplayName = user.DisplayName,
      Email = user.Email,
      ImageUrl = user.ImageUrl
    };

    return Ok(userDto);
  }

  [AllowAnonymous]
  [HttpPost("register")]
  public async Task<ActionResult> RegisterUser([FromBody] RegisterDto registerDto)
  {
    var user = new User() 
    {
      DisplayName = registerDto.DisplayName,
      UserName = registerDto.Email,
      Email = registerDto.Email
    };

    var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

    if(result.Succeeded)
    {
      return Ok();
    }

    foreach(var error in result.Errors) 
    {
      ModelState.AddModelError(error.Code, error.Description);
    }

    return ValidationProblem();
  }

  [HttpPost("logout")]
  public async Task<ActionResult> LogOut()
  {
    await signInManager.SignOutAsync();
    return NoContent();
  }
}
