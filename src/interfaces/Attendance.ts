export interface Attendance {
    id?: number;
    employeeId: number;
    attendanceDate: number;
    clockIn: string;
    clockOut: string;
    hoursWorked: number;
    status: string;
}