using CarDealerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarDealerAPI.Data
{
    public class CarDealerContext : DbContext
    {
        public CarDealerContext(DbContextOptions<CarDealerContext> options)
            : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
    }
}