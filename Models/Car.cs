namespace CarDealerAPI.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string StockLevel { get; set; }
        public int DealerId { get; set; }
    }
}