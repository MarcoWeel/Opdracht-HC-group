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
    public class SubTypesController : ControllerBase
    {
        private readonly Opdracht_HC_groupContext _context;

        public SubTypesController(Opdracht_HC_groupContext context)
        {
            _context = context;
        }

        // GET: api/SubTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubType>>> GetSubType()
        {
            return await _context.SubType.ToListAsync();
        }

        // GET: api/SubTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubType>> GetSubType(Guid id)
        {
            var subType = await _context.SubType.FindAsync(id);

            if (subType == null)
            {
                return NotFound();
            }

            return subType;
        }

        // PUT: api/SubTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubType(Guid id, SubType subType)
        {
            if (id != subType.SubTypeId)
            {
                return BadRequest();
            }

            _context.Entry(subType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubTypeExists(id))
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

        // POST: api/SubTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubType>> PostSubType(SubType subType)
        {
            _context.SubType.Add(subType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubType", new { id = subType.SubTypeId }, subType);
        }

        // DELETE: api/SubTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubType(Guid id)
        {
            var subType = await _context.SubType.FindAsync(id);
            if (subType == null)
            {
                return NotFound();
            }

            _context.SubType.Remove(subType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubTypeExists(Guid id)
        {
            return _context.SubType.Any(e => e.SubTypeId == id);
        }
    }
}
