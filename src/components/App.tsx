import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  DataProps,
  RootState,
  getCrypto,
  getHistory,
  changePair,
} from '../store';
import { socket } from '../socket';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Outlet } from 'react-router-dom';

import { Line } from 'react-chartjs-2';
import { formatData } from '../utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { currencies, historical, pair } = useSelector(
    (state: RootState): DataProps => state.data
  );
  const [price, setPrice] = useState('0.00');

  useEffect(() => {
    dispatch(getCrypto());
    socket.addEventListener('open', () => {
      sendMessage('subscribe');
    });
  }, [dispatch]);

  useEffect(() => {
    socket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.type !== 'ticker') {
        return;
      }
      if (data.product_id === pair) {
        setPrice(data.price);
      }
    });

    if (currencies) {
      dispatch(getHistory(pair));
    }
  }, [dispatch, pair]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    sendMessage('unsubscribe');
    dispatch(changePair(e.target.value));
    sendMessage('subscribe', e.target.value);
  };

  const sendMessage = (type: string, pairValue: string = pair): void => {
    const msg = {
      type,
      product_ids: [pairValue],
      channels: ['ticker'],
    };
    const jsonMsg = JSON.stringify(msg);
    socket.send(jsonMsg);
  };

  return (
    <main>
      <select onChange={handleChange} defaultValue={'BTC-USD'}>
        <option value={'BTC-USD'}>BTC-USD</option>
        <option value={'ETH-USD'}>ETH-USD</option>
        <option value={'RNDR-USD'}>RNDR-USD</option>
      </select>
      {price}
      {/* <Line data={formatData((historical as Array<Array<number>>) || [])} /> */}
      <Outlet />
    </main>
  );
}
