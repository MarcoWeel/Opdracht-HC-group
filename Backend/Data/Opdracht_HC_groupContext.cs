using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Opdracht_HC_group.Models;

namespace Opdracht_HC_group.Data
{
    public class Opdracht_HC_groupContext : DbContext
    {
        //public Opdracht_HC_groupContext (DbContextOptions<Opdracht_HC_groupContext> options)
        //    : base(options)
        //{
        //}

        ///Using in memory to simplify execution and setup for the assignment.
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "Opdracht_HC_groupDB");
        }

        public DbSet<Opdracht_HC_group.Models.Brand> Brand { get; set; } = default!;
        public DbSet<Opdracht_HC_group.Models.Filament> Filament { get; set; } = default!;
        public DbSet<Opdracht_HC_group.Models.MainType> MainType { get; set; } = default!;
        public DbSet<Opdracht_HC_group.Models.SubType> SubType { get; set; } = default!;
    }
}
