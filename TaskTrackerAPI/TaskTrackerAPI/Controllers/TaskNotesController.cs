using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTrackerAPI.Models;

namespace TaskTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskNotesController : ControllerBase
    {
        private readonly DataContext _context;

        public TaskNotesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TaskNotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskNote>>> GetTaskNote()
        {
          if (_context.TaskNote == null)
          {
              return NotFound();
          }
            return await _context.TaskNote.ToListAsync();
        }

        // GET: api/TaskNotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskNote>> GetTaskNote(int id)
        {
          if (_context.TaskNote == null)
          {
              return NotFound();
          }
            var taskNote = await _context.TaskNote.FindAsync(id);

            if (taskNote == null)
            {
                return NotFound();
            }

            return taskNote;
        }

        // PUT: api/TaskNotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskNote(int id, TaskNote taskNote)
        {
            if (id != taskNote.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskNoteExists(id))
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

        // POST: api/TaskNotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskNote>> PostTaskNote(TaskNote taskNote)
        {
          if (_context.TaskNote == null)
          {
              return Problem("Entity set 'DataContext.TaskNote'  is null.");
          }
            _context.TaskNote.Add(taskNote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskNote", new { id = taskNote.Id }, taskNote);
        }

        // DELETE: api/TaskNotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskNote(int id)
        {
            if (_context.TaskNote == null)
            {
                return NotFound();
            }
            var taskNote = await _context.TaskNote.FindAsync(id);
            if (taskNote == null)
            {
                return NotFound();
            }

            _context.TaskNote.Remove(taskNote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskNoteExists(int id)
        {
            return (_context.TaskNote?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
