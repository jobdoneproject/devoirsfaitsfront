export class CourseSlot {
    date: Date;
    duration: Date;
    organizer: String;
    roomNumber: Number;

    constructor(
        date: Date,
        duration: Date,
        organizer: String,
        roomNumber: Number,
    ) {
        this.date = date;
        this.duration = duration;
        this.organizer = organizer;
        this.roomNumber = roomNumber;
    }
}