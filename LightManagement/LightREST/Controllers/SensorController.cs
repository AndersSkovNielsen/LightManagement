using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LightREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        ManageSensor manager = new ManageSensor();

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> HentAlleSensor()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> HentEnSensor(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void TilføjSensor([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void OpdaterSensor(int id, [FromBody] string value)
        {
            return manager.OpdaterSensor(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void SletSensor(int id)
        {
        }
    }
}
