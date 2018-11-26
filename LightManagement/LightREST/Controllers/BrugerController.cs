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
        public IEnumerable<Bruger> GetAll()
        {
            return manager.HentAlleBruger();
        }

        // GET: api/Bruger/5
        [HttpGet("{id}", Name = "Get")]
        public Bruger Get(int id)
        {
            return manager.HentBrugerFraId(id);
        }

        // POST: api/Bruger
        [HttpPost]
        public bool Post([FromBody] Bruger value)
        {
            return manager.IndsætBruger(value);
        }

        // PUT: api/Bruger/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
