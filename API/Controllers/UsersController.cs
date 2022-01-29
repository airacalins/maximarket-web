using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly PropertyManagementContext _context;
    private readonly UserManager<User> _userManager;
    public UsersController(PropertyManagementContext context, UserManager<User> userManager)
    {
      _context = context;
      _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<List<ApplicationUserDto>>> GetAll()
    {
      var users = await _context.Users.Include(i => i.Photo)
      .Select(i => new ApplicationUserDto
      {
        Id = i.Id,
        IsEnabled = i.IsEnabled,
        FirstName = i.FirstName,
        LastName = i.LastName,
        Phone = i.Phone,
        Email = i.Email,
        Address = i.Address
      }).ToListAsync();

      return Ok(users);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ApplicationUserDto>> GetOne(string id)
    {
      var user = await _context.Users.Include(i => i.Photo)
      .Select(i => new ApplicationUserDto
      {
        Id = i.Id,
        IsEnabled = i.IsEnabled,
        FirstName = i.FirstName,
        LastName = i.LastName,
        Phone = i.Phone,
        Email = i.Email,
        Address = i.Address
      }).FirstOrDefaultAsync(i => i.Id == id);
      return Ok(user);
    }

    [HttpPost("add-user")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
      var user = new User { UserName = registerDto.Email };
      user.IsEnabled = true;
      user.FirstName = registerDto.FirstName;
      user.LastName = registerDto.LastName;
      user.Phone = registerDto.Phone;
      user.Email = registerDto.Email;
      user.Address = registerDto.Address;
      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (!result.Succeeded)
      {
        foreach (var error in result.Errors)
        {
          ModelState.AddModelError(error.Code, error.Description);
        }

        return ValidationProblem();
      }

      await _userManager.AddToRoleAsync(user, "User");
      return Ok();
    }

    [HttpPut]
    public async Task<ActionResult<ApplicationUserDto>> UpdateSlot(ApplicationUserDto input)
    {
      var user = await _context.Users.FindAsync(input.Id);
      if (user == null)
        return NotFound("User not found");

      user.IsEnabled = input.IsEnabled;
      user.FirstName = input.FirstName;
      user.LastName = input.LastName;
      user.Phone = input.Phone;
      user.Email = input.Email;
      user.Address = input.Address;

      await _context.SaveChangesAsync();

      return Ok(user);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSlot(string id)
    {
      var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == id);
      if (user == null)
        return NotFound("User not found");

      user.IsEnabled = false;
      await _context.SaveChangesAsync();

      return Ok();
    }
  }
}