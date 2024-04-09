import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/vendors/vendorsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const VendorsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.vendors);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View vendors')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View vendors')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Picture</p>
            {vendors?.picture?.length ? (
              <ImageField
                name={'picture'}
                image={vendors?.picture}
                className='w-20 h-20'
              />
            ) : (
              <p>No Picture</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>HourlyRate</p>
            <p>{vendors?.hourly_rate || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{vendors?.user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{vendors?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Orders Vendor</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>OrderDate</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.orders_vendor &&
                      Array.isArray(vendors.orders_vendor) &&
                      vendors.orders_vendor.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/orders/orders-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='order_date'>
                            {dataFormatter.dateTimeFormatter(item.order_date)}
                          </td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!vendors?.orders_vendor?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Reviews Vendor</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ReviewDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.reviews_vendor &&
                      Array.isArray(vendors.reviews_vendor) &&
                      vendors.reviews_vendor.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reviews/reviews-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='review_date'>
                            {dataFormatter.dateTimeFormatter(item.review_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!vendors?.reviews_vendor?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/vendors/vendors-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

VendorsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_VENDORS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default VendorsView;
