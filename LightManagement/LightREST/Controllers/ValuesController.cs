using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LightREST.DBUtil;
using Microsoft.AspNetCore.Mvc;
using ModelLibrary;

namespace LightREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        ManageSensor manager = new ManageSensor();

        // GET api/values
        [HttpGet]
        public List<Sensor> HentAlleSensor()
        {
            return manager.HentAlleSensor();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Sensor HentEnSensor(int id)
        {
            return manager.HentEnSensor(id);
        }

        // POST api/values
        [HttpPost]
        public bool TilføjSensor([FromBody] Sensor value)
        {
            return manager.TilføjSensor(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public bool OpdaterSensor(int id, [FromBody] Sensor value)
        {
            return manager.OpdaterSensor(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Sensor FjernSensor(int id)
        {
            return manager.FjernSensor(id);
        }
    }
}
