import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useMemo } from 'react';
import { FiCalendar } from 'react-icons/fi';
import styles from '../../styles/common.module.scss';

interface PublicationDateProps {
  date: string;
}

export const PublicationDate = ({ date }: PublicationDateProps) => {
  const formattedDate = useMemo(() => {
    return format(new Date(date), 'dd MMM yyy', {
      locale: ptBR,
    });
  }, [date]);

  return (
    <time className={styles.infoBox}>
      <FiCalendar />
      <span>{formattedDate}</span>
    </time>
  );
};
