import { IconType } from 'react-icons';
import styles from '../../styles/common.module.scss';

interface InfoBoxProps {
  icon: IconType;
  value: string;
}

export const InfoBox = ({ icon: Icon, value }: InfoBoxProps) => (
  <div className={styles.infoBox}>
    <Icon />
    <span>{value}</span>
  </div>
);
