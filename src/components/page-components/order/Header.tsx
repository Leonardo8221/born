import { FC } from 'react';
import { Button } from '@/components/molecules/Button';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import ArrowIconLeft from '@/assets/svgs/arrow-left.svg';
import { Heading } from '@/components/molecules/Heading';
import { Pill } from '@/components/atoms/Pill';
import { useRouter } from 'next/router';
import { apiConfig } from '@/utils/apiConfig';
import { OrderReportResourceApi } from 'client/command';
import { downloadFile } from '@/utils/downloadFile';
import { Icon } from '@/components/molecules/Icon';

interface HeaderProps {
  heading: string;
  status: {
    confirmed: boolean;
    approved: boolean;
    cancelled: boolean;
  },
  handleErrorMessage?: (error: string) => void;
  addNote?: () => void;
}

const Header: FC<HeaderProps> = ({ heading, handleErrorMessage, addNote, status }) => {
  const router = useRouter();
  const orderId = Number(router?.query?.orderId);

  const handleDownloadCollection = async (downloadAs: 'pdf' | 'xlsx') => {
    try {
      const config = await apiConfig();
      const api = new OrderReportResourceApi(config);
      let file: BlobPart;
      if (downloadAs === 'pdf') {
        const response = await api.apiOrderDownloadOrderReportAsPdfGet(
          orderId,
          { responseType: 'blob' }
        );
        file = response.data as any;
      } else {
        const response = await api.apiOrderDownloadOrderReportAsExcelGet(
          orderId,
          { responseType: 'blob' }
        );
        file = response?.data as any;
      }
      downloadFile(file, downloadAs);
    } catch (error) {
      console.log(error);
      handleErrorMessage?.('Failed to download file!');
    }
  };

  const items = [
    {
      label: 'PDF',
      value: 'pdf',
      action: () => handleDownloadCollection('pdf'),
    },
    {
      label: 'Excel',
      value: 'excel',
      action: () => handleDownloadCollection('xlsx'),
    },
  ];

  const getStatus = () => {
    if (status.confirmed) {
      return 'Confirmed';
    } else if (status.approved) {
      return 'Approved';
    } else if (status.cancelled) {
      return 'Cancelled'
    }
    return 'Draft'
  }

  return (
    <div className="flex w-full max-w-[1440px] mx-auto items-center justify-between pt-[32px] px-[32px]">
      <div className="flex w-[620px] gap-4 items-center">
        <ArrowIconLeft
          height={40}
          width={40}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <Pill label={getStatus()} appearance={'outlined'} size={'sm'} />
        <Heading fontWeight="light" size="sm">
          {heading}
        </Heading>
      </div>
      <div className="flex items-center gap-x-4">
        <div>
        {!status?.approved && !status.cancelled && !status?.confirmed && (
          <Button
            label={'Add not'}
            {...{ variant: 'outlined' }}
            className="relative"
            onClick={addNote}
          >
            <Icon name="icon-message-square" />
          </Button>
        )}
        {
          status.confirmed && (
            <Button
            label={'Revert to draft'}
            {...{ variant: 'outlined' }}
            className="relative"
            onClick={addNote}
          >
          </Button>
          )
        }
        </div>
        <div>
          <DropdownMenu
            options={items}
            variant="button"
            label="Download"
            buttonProps={{
              variant: 'outlined',
            }}
          />
        </div>
        <div>
          {
            !status?.approved && !status.cancelled && !status?.confirmed && (
              <Button className="!w-[172px] !px-[28px] text-[14px] leading-6">
                Confirm
              </Button>
            )
          }
          {
            status?.confirmed && (
              <Button className="!w-[172px] !px-[28px] text-[14px] leading-6">
                Approve
              </Button>
            )
          }
          {
            status?.approved && (
              <Button className="!w-[172px] !px-[28px] text-[14px] leading-6">
                Cancel order
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
