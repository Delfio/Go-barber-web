import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
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
import { useAuth } from '../../hooks/Auth';
import api from '../../services/apiClient';

type IMonthAvailability = {
  day: number;
  available: boolean
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [monthAvailability, setMonthAvailability] = useState<IMonthAvailability[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

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

  const disableDays = useMemo(() => monthAvailability
    .filter((monthDay) => monthDay.available === false)
    .map((monthDay) => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      return new Date(year, month, monthDay.day);
    }), [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImage} alt="GoBarber" />

          <Profile>
            <img
              src={user.avatar}
              alt={user.name}
            />
            <div>
              <span>Bem-Vindo</span>
              <strong>{user.name}</strong>
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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-Feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/42546922?s=460&u=7e7ee3bc668ac96dab3ed6f5653ff1940413cc7b&v=4"
                alt="Delfio Francisco"
              />
              <strong>Delfio Francisco</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/42546922?s=460&u=7e7ee3bc668ac96dab3ed6f5653ff1940413cc7b&v=4"
                  alt="Delfio Francisco"
                />
                <strong>Delfio Francisco</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/42546922?s=460&u=7e7ee3bc668ac96dab3ed6f5653ff1940413cc7b&v=4"
                  alt="Delfio Francisco"
                />
                <strong>Delfio Francisco</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                14:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/42546922?s=460&u=7e7ee3bc668ac96dab3ed6f5653ff1940413cc7b&v=4"
                  alt="Delfio Francisco"
                />
                <strong>Delfio Francisco</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/42546922?s=460&u=7e7ee3bc668ac96dab3ed6f5653ff1940413cc7b&v=4"
                  alt="Delfio Francisco"
                />
                <strong>Delfio Francisco</strong>
              </div>
            </Appointment>
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
