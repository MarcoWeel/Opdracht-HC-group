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
    public class FilamentsController : ControllerBase
    {
        private readonly Opdracht_HC_groupContext _context;

        public FilamentsController(Opdracht_HC_groupContext context)
        {
            _context = context;
        }

        // GET: api/Filaments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filament>>> GetFilament()
        {
            return await _context.Filament.ToListAsync();
        }

        // GET: api/Filaments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Filament>> GetFilament(Guid id)
        {
            var filament = await _context.Filament.FindAsync(id);

            if (filament == null)
            {
                return NotFound();
            }

            return filament;
        }

        // PUT: api/Filaments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilament(Guid id, Filament filament)
        {
            if (id != filament.FilamentId)
            {
                return BadRequest();
            }

            _context.Entry(filament).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilamentExists(id))
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

        // POST: api/Filaments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Filament>> PostFilament(Filament filament)
        {
            _context.Filament.Add(filament);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilament", new { id = filament.FilamentId }, filament);
        }

        // DELETE: api/Filaments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilament(Guid id)
        {
            var filament = await _context.Filament.FindAsync(id);
            if (filament == null)
            {
                return NotFound();
            }

            _context.Filament.Remove(filament);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FilamentExists(Guid id)
        {
            return _context.Filament.Any(e => e.FilamentId == id);
        }
    }
}
