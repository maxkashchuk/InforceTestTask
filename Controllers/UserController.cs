using InforceTestTask.Models.ControllerModels;
using InforceTestTask.Models.EntityModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InforceTestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        ApplicationContext _AppContext;
        public UserController(ApplicationContext _AppContext) 
        {
            this._AppContext = _AppContext;
        }

        [Route("login")]
        [HttpPost]
        async public Task<ActionResult> LoginUser(UserLogin user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            User? u = await _AppContext.Users.Where(el => el.Login == user.Login && el.Password == user.Password).FirstOrDefaultAsync();

            if (u != null)
            {
                return Ok(u);
            }

            return BadRequest();
        }
    }
}
