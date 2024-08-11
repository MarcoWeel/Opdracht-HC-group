using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Opdracht_HC_group.Data;
using Opdracht_HC_group.Models;

namespace Opdracht_HC_group.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainTypeController : ControllerBase
    {
        private readonly Opdracht_HC_groupContext _context;

        public MainTypeController(Opdracht_HC_groupContext context)
        {
            _context = context;
        }

        // GET: api/MainTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MainType>>> GetMainType()
        {
            return await _context.MainType.ToListAsync();
        }

        // GET: api/MainTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MainType>> GetMainType(Guid id)
        {
            var mainType = await _context.MainType.FindAsync(id);

            if (mainType == null)
            {
                return NotFound();
            }

            return mainType;
        }

        // PUT: api/MainTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMainType(Guid id, MainType mainType)
        {
            if (id != mainType.MainTypeId)
            {
                return BadRequest();
            }

            _context.Entry(mainType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MainTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MainTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MainType>> PostMainType(string mainTypeName)
        {
            MainType mainType = new MainType
            {
                Name = mainTypeName
            };
            _context.MainType.Add(mainType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMainType", new { id = mainType.MainTypeId }, mainType);
        }

        // DELETE: api/MainTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMainType(Guid id)
        {
            var mainType = await _context.MainType.FindAsync(id);
            if (mainType == null)
            {
                return NotFound();
            }

            _context.MainType.Remove(mainType);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool MainTypeExists(Guid id)
        {
            return _context.MainType.Any(e => e.MainTypeId == id);
        }
    }
}
