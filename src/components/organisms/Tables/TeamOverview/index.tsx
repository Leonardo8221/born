import React, { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import { fonts } from '@/config/fonts';
import { Table } from '../../Table';
import { formatDate } from '@/utils';
import { UserGraphqlDto } from '@/generated/types';
import { Paragraph } from '@/components/molecules/Paragraph';

export interface TeamOverViewProps {
  teams: UserGraphqlDto[];
  handleRemoveUser?: (userId: number) => void;
}

const TeamOverView: FC<TeamOverViewProps> = ({ teams, handleRemoveUser }) => {
  const columnHelper: any = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 209,
      id: 'teamMemberName',
      cell: ({ row }: any) => (
        <div className="pl-4">
          <h3
            className={clsx(
              'text-shades-blak tracking-[0.06em]',
              fonts.text.lg
            )}
          >
            {row?.original?.user_entity?.keycloak_first_name}{' '}
            {row?.orignal?.user_entity?.keycloak_last_name}
          </h3>
          <p
            className={clsx(
              'text-neutral-700 font-light tracking-[0.06em]',
              fonts.text.md
            )}
          >
            {row?.original?.user_entity?.keycloak_email}
          </p>
        </div>
      ),
      header: () => 'Team Member Name',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 185,
      id: 'last_logged_in',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black font-normal tracking-[0.06em] text-center',
            fonts.text.md
          )}
        >
          {info?.getValue() &&
            formatDate(info?.getValue?.()?.user_entity?.last_logged_in)}
        </div>
      ),
      header: () => 'Last logged in',
    }),
    columnHelper.accessor('role_type', {
      size: 97,
      id: 'role_type',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black capitalize font-normal tracking-[0.06em] text-center',
            fonts.text.md
          )}
        >
          {info?.getValue()?.toLowerCase() || 'Owner'}
        </div>
      ),
      header: () => 'Permission',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 60,
      id: 'actions',
      cell: (info: any) => {
        const options = [
          // {
          //   label: 'Manage role',
          //   value: 'manage-role',
          //   action: () => console.log('Manage role!'),
          // },
          {
            label: 'Revoke access',
            value: 'revoke-access',
            action: () =>
              handleRemoveUser && handleRemoveUser(info?.row?.original?.user_entity?.id),
          },
        ];
        return (
          <div>
            <DropdownMenu options={options} variant="dots" />
          </div>
        );
      },
      header: () => '',
    }),
  ];

  return (
    <div>
      <Table
        tableData={teams}
        columns={columns}
        className="w-full max-w-[563px] [&>tbody>tr>td]:pt-4"
      />
      {!teams?.length && (
        <div className="max-w-[563] text-center">
          <Paragraph size="base" className="!text-shades-black !font-light">
            No data found!
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default TeamOverView;
