import { FC, useState } from 'react';
import { Button } from '@/components/molecules/Button';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import ArrowIconLeft from '@/assets/svgs/arrow-left.svg';
import { Heading } from '@/components/molecules/Heading';
import { Pill } from '@/components/atoms/Pill';
import { useRouter } from 'next/router';
import { apiConfig } from '@/utils/apiConfig';
import { OrderReportResourceApi, OrderResourceApi } from 'client/command';
import { download, downloadFile } from '@/utils/downloadFile';
import { Icon } from '@/components/molecules/Icon';
import { Logo } from '@/components/atoms/Logo';
import Input from '@/components/molecules/Inputs/Input';
import { fonts } from '@/config/fonts';
import clsx from 'clsx';

interface HeaderProps {
  heading: string;
  status: {
    confirmed: boolean;
    approved: boolean;
    cancelled: boolean;
    draft: boolean;
  };
  handleErrorMessage?: (error: string) => void;
  addNote?: () => void;
  handleSave?: () => void;
  id?: number;
  setSuccessMessage?: (message: string) => void;
  setErrorMessage?: (message: string) => void;
  refetch?: () => void;
  total_quantities?: number;
  editMode?: boolean;
  onChange?: (value: string) => void;
}

const Header: FC<HeaderProps> = ({
  heading,
  handleErrorMessage,
  addNote,
  status,
  id,
  setErrorMessage,
  setSuccessMessage,
  refetch,
  total_quantities,
  editMode,
  onChange,
  handleSave,
}) => {
  const router = useRouter();
  const orderId = Number(router?.query?.orderId);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCollection = async () => {
    try {
      const config = await apiConfig();
      const api = new OrderReportResourceApi(config);
      let file: BlobPart;
      const response = await api.apiOrderDownloadOrderReportAsExcelGet(
        orderId,
        undefined,
        { responseType: 'blob' }
      );
      file = response?.data as any;
      download(
        response.data as any,
        response?.headers?.['content-disposition']
      );
    } catch (error) {
      console.log(error);
      handleErrorMessage?.('Failed to download file!');
    }
  };

  const handleActions = async (action: string) => {
    if (!id) {
      setErrorMessage?.('Order id is required!');
      return;
    }
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      if (action === 'revert') {
        await api.apiOrderRevertToDraftOrderPut(id);
        setSuccessMessage?.('Order has been reverted to draft!');
      }
      if (action === 'confirm') {
        await api.apiOrderConfirmOrderPut(id);
        setSuccessMessage?.('Order confirmed successfully!');
      }
      if (action === 'cancel') {
        await api.apiOrderCancelOrderPut(id);
        setSuccessMessage?.('Order cancelled successfully!');
      }
      if (action === 'approve') {
        await api.apiOrderApproveOrderPut(id);
        setSuccessMessage?.('Order approved successfully!');
      }
      refetch?.();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const items = [
    {
      label: 'PDF',
      value: 'pdf',
      action: () => window?.print(),
    },
    {
      label: 'Excel',
      value: 'excel',
      action: () => handleDownloadCollection(),
    },
  ];

  const getStatus = () => {
    if (status.confirmed) {
      return 'Confirmed';
    } else if (status.approved) {
      return 'Approved';
    } else if (status.cancelled) {
      return 'Cancelled';
    }
    return 'Draft';
  };

  return (
    <>
      <PrintHeader heading={heading} />
      <div className="print:hidden flex w-full max-w-[1440px] mx-auto items-center justify-between pt-[32px] px-[32px]">
        <div className="flex w-[620px] gap-4 items-center">
          <ArrowIconLeft
            height={40}
            width={40}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <Pill label={getStatus()} appearance={'outlined'} size={'sm'} />
          {editMode ? (
            <Input
              value={heading}
              onChange={(value) => onChange?.(value)}
              className="!border-neutral-400 !rounded-[4px] [&>div]:!h-auto"
              inputProps={{
                className: clsx(
                  fonts.headings.md,
                  'px-[14px] !outline-none !leading-[48px]'
                ),
              }}
            />
          ) : (
            <Heading fontWeight="light" size="sm">
              {heading}
            </Heading>
          )}
        </div>
        <div className="flex items-center gap-x-4">
          <div>
            {!status?.approved && !status.cancelled && !status?.confirmed && (
              <Button
                {...{ variant: 'outlined' }}
                className="relative h-10 w-10 !p-0"
                onClick={addNote}
                disabled={isLoading}
              >
                <Icon name="icon-message-square" />
              </Button>
            )}
            {status?.confirmed && (
              <Button
                label={'Revert to draft'}
                {...{ variant: 'outlined' }}
                className="relative"
                onClick={() => handleActions('revert')}
                disabled={isLoading}
              ></Button>
            )}
          </div>
          {!status?.approved && !status.cancelled && !status?.confirmed && (
            <div>
              <Button
                {...{ variant: 'outlined' }}
                className="relative h-10 w-10 !p-0"
                onClick={handleSave}
                disabled={isLoading}
              >
                <Icon name="icon-save" />
              </Button>
            </div>
          )}
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
            {!status?.approved && !status.cancelled && !status?.confirmed && (
              <Button
                className="!w-[172px] !px-[28px] text-[14px] leading-6"
                disabled={!total_quantities || isLoading}
                onClick={() => handleActions('confirm')}
              >
                Confirm
              </Button>
            )}
            {status?.confirmed && (
              <Button
                className="!w-[172px] !px-[28px] text-[14px] leading-6"
                onClick={() => handleActions('approve')}
                disabled={isLoading}
              >
                Approve
              </Button>
            )}
            {status?.approved && (
              <Button
                className="!w-[172px] !px-[28px] text-[14px] leading-6"
                onClick={() => handleActions('cancel')}
                disabled={isLoading}
              >
                Cancel order
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const PrintHeader: FC<{ heading: string }> = ({ heading }) => (
  <div className="hidden print:flex items-center max-w-[1440px] mx-auto p-8">
    <Logo variant="dark" />
    <div className="w-full text-center">
      <Heading fontWeight="light" size="sm">
        {heading}
      </Heading>
    </div>
  </div>
);

export default Header;
