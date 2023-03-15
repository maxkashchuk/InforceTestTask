using InforceTestTask.Models.ControllerModels;
using InforceTestTask.Models.EntityModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InforceTestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class URLController : ControllerBase
    {
        ApplicationContext _AppContext;
        public URLController(ApplicationContext _AppContext)
        {
            this._AppContext = _AppContext;
        }

        [Route("urladd")]
        [HttpPost]
        async public Task<ActionResult> AddURL(AddURL url)
        {
            URL? Url = await _AppContext.URLs.Where(el => el.LongUrl == url.Url).FirstOrDefaultAsync();

            User? User = await _AppContext.Users.Where(el => el.Login == url.Login).FirstOrDefaultAsync();


            if (Url == null)
            {
                Url = new URL()
                {
                    LongUrl = url.Url,
                    ShortUrl = ShortenURL.Algorithm(url.Url),
                    user = User
                };
                await _AppContext.URLs.AddAsync(Url);
                await _AppContext.SaveChangesAsync();
                return Ok(Url);
            }

            return BadRequest();
        }

        [Route("urldelete")]
        [HttpPost]
        async public Task<ActionResult> DeleteURL([FromBody]string url)
        {
            URL? Url = await _AppContext.URLs.Where(el => el.LongUrl == url).FirstOrDefaultAsync();

            if (Url != null)
            {
                _AppContext.URLs.Remove(Url);
                await _AppContext.SaveChangesAsync();
                return Ok(Url);
            }

            return BadRequest();
        }

        [Route("urlget")]
        [HttpGet]
        async public Task<ActionResult> GetURL()
        {
            List<URL> urls = await _AppContext.URLs.ToListAsync();
            if (urls != null)
            {
                return Ok(urls);
            }

            return BadRequest();
        }

        [Route("urlgetinfo")]
        [HttpPost]
        async public Task<ActionResult> GetURLinfo([FromBody]string short_url)
        {
            URL? url = await _AppContext.URLs.Where(el => el.ShortUrl == short_url).FirstOrDefaultAsync();
            
            User? user = await _AppContext.Users.Where(el => el.Id == url.UserId).FirstOrDefaultAsync();
            
            if (url != null)
            {
                InfoModel model = new InfoModel()
                {
                    URLid = url.Id,
                    LongURL = url.LongUrl,
                    ShortURL = short_url,
                    Date = DateTime.Now,
                    UserId = user.Id,
                    UserLogin = user.Login,
                    UserPassword = user.Password
                };
                return Ok(model);
            }

            return BadRequest();
        }
    }
}
