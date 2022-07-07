namespace TaskTrackerAPI.Models
{
    public class TaskNote
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Comments { get; set; }

        public bool Reminder { get; set; }

        public int TaskTypeId { get; set; }

        public TaskType? TaskTypeName{ get; set; }
    }
}
