import { FC } from 'react';
import './MonthCommissionStat.scss';
import moment from 'moment';
import { formatNum } from '../../../../utils';

export const MonthCommissionStat: FC<{commission: number}> = ({commission}) => {
  return <div className="MonthCommissionStat shadow-lg bg-body rounded d-flex flex-column align-items-center p-4">
    <p className='fs-6 my-0 text-muted text-uppercase'>{moment().format('MMMM')} COMMISSION</p>
    <p className='fs-1 my-0 fw-bold'><span className="fs-4">KES</span> {formatNum(commission)}</p>
    <p className='my-0'><span className='fs-6 text-muted'>-30% TAX</span> <span className='fs-4 mx-2'><span className="fs-5">KES</span> {formatNum(commission - .3 * commission)}</span></p>
  </div>;
};
