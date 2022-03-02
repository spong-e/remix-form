import { useLoaderData, json, Link } from "remix";
import { GraphQLClient, gql } from "graphql-request";

const GetProfilesQuery = gql`
  {
    profiles {
      id
      firstName
      lastName
    }
  }
`;

export const loader = async () => {
  const graphClient = new GraphQLClient(
    "http://localhost:4000"
  );

  const { profiles  } = await graphClient.request(GetProfilesQuery);

  return json({ profiles });
};

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export default function Index() {
  const data = useLoaderData<Profile[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Profiles</h1>
      <ul>
        {data.profiles.map(profile => (
          <li key={profile.id}>
            <Link to={`${profile.id}`}>{profile.firstName} {profile.lastName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
