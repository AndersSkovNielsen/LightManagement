using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LightREST.DBUtil;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelLibrary;

namespace LightREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrugerController : ControllerBase
    {
        ManageBruger manager = new ManageBruger();

        // GET: api/Bruger
        [HttpGet]
        public IEnumerable<Bruger> HentAlleBruger()
        {
            return manager.HentAlleBruger();
        }

        // GET: api/Bruger/5
        [HttpGet("{id}", Name = "Get")]
        public Bruger HentEnBruger(int id)
        {
            return manager.HentEnBruger(id);
        }

        // POST: api/Bruger
        [HttpPost]
        public bool TilføjBruger([FromBody] Bruger value)
        {
            return manager.TilføjBruger(value);
        }

        // PUT: api/Bruger/5
        [HttpPut("{id}")]
        public bool OpdaterBruger(int id, [FromBody] Bruger value)
        {
            return manager.OpdaterBruger(id, value);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool SletBruger(int id)
        {
            return manager.FjernBruger(id);
        }
    }
}
