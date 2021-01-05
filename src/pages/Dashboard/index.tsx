import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  Content,
  NextAppointment,
  Section,
  Calendar,
  Appointment,
} from './styles';
import logoImage from '../../asssets/logo.svg';
import { useAuth, IUser } from '../../hooks/Auth';
import api from '../../services/apiClient';

type IMonthAvailability = {
  day: number;
  available: boolean
}

type IAppointmentsRequestData = {
    id: string,
    user_id: string,
    date: string,
    created_at: string,
    __user__: IUser
}

type IAppointmentsFormated = {
    id: string,
    user_id: string,
    date: Date,
    hourFormated: string,
    created_at: Date,
    user: IUser
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [monthAvailability, setMonthAvailability] = useState<IMonthAvailability[]>([]);
  const [appointments, setAppointemnts] = useState<IAppointmentsFormated[]>([]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day);
      }
    }, [],
  );

  useEffect(() => {
    api.get<IMonthAvailability[]>(
      `/appointments/providers/availability/${user.id}/monthAvailability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      },
    ).then((response) => {
      const { data } = response;
      setMonthAvailability(data);
    });
  }, [currentMonth, user.id]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const selectedDateFormated = useMemo(() => {
    const span = new Date().toLocaleDateString() === selectedDate.toLocaleDateString() && (
    <span> Hoje </span>
    );

    const dayText = `Dia ${selectedDate.toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
    })}`;

    const dateFormated = selectedDate.toLocaleDateString('pt-br', {
      weekday: 'long',
    });

    return {
      span,
      dayText,
      dateFormated,
    };
  }, [selectedDate]);

  const disableDays = useMemo(() => monthAvailability
    .filter((monthDay) => monthDay.available === false)
    .map((monthDay) => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      return new Date(year, month, monthDay.day);
    }), [currentMonth, monthAvailability]);

  const formatTimeForDisplay = useCallback(
    (time: Date) => time.toLocaleTimeString('pt-br', {
      formatMatcher: 'basic',
    }).substring(0, 5), [],
  );

  useEffect(() => {
    api.get<IAppointmentsRequestData[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      },
    }).then((response) => {
      const schedulesWithFormattedDates: IAppointmentsFormated[] = response.data.map(
        (appointment) => ({
          ...appointment,
          user: appointment.__user__,
          hourFormated: formatTimeForDisplay(new Date(appointment.date)),
          date: new Date(appointment.date),
          created_at: new Date(appointment.created_at),
        }),
      );
      setAppointemnts(schedulesWithFormattedDates);
    });
  }, [selectedDate, formatTimeForDisplay]);

  const morningAppointments = useMemo(
    () => appointments.filter(
      (appointment) => appointment.date.getHours() <= 12,
    ), [appointments],
  );

  const afternoonAppointments = useMemo(
    () => appointments.filter(
      (appointment) => appointment.date.getHours() > 12,
    ), [appointments],
  );

  const nextAppointment = useMemo(() => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      return appointments.find((appointment) => appointment.date > new Date());
    }
    return null;
  }, [selectedDate, appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImage} alt="GoBarber" />

          <Profile>
            <img
              src={user.avatar_url}
              alt={user.name}
            />
            <div>
              <span>Bem-Vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {selectedDateFormated.span}
            <span>{selectedDateFormated.dayText}</span>
            <span>{selectedDateFormated.dateFormated}</span>
          </p>

          {nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {formatTimeForDisplay(nextAppointment.date)}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>
            {morningAppointments.length < 1 ? (
              <p>Nenhum agendamento para este período</p>
            ) : morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormated}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length < 1 ? (
              <p>Nenhum agendamento para este período</p>
            ) : afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormated}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}

          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa']}
            fromMonth={new Date()}
            disabledDays={[
              { daysOfWeek: [0, 6] },
              ...disableDays,
            ]}
            modifiers={{
              available: {
                daysOfWeek: [1, 2, 3, 4, 5],
              },
            }}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
