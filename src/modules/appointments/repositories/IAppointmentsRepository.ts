import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/iCreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  // save(appointment: Appointment): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
