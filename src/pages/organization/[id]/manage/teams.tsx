import ManageLayout from "@/components/layouts/ManageLayout";
import Tabs from "@/components/molecules/Tab/Tabs";
import Affliations from "@/components/page-components/affliations";
import Teams from "@/components/page-components/teams";

const TeamsPage = () => {
  const tabs = [
    {
      id: 'team-management',
      label: 'Team Management',
      content: <Teams />
    },
    {
      id: 'Affliation',
      label: 'Affliations',
      content: <Affliations />
    },
  ]
  return (
    <ManageLayout>
      <Tabs tabs={tabs} />
    </ManageLayout>
  )
}

export default TeamsPage;
