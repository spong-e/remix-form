import { useLoaderData, json, Link } from "remix";
import { GraphQLClient, gql } from "graphql-request";

const GetProfileById = gql`
  query ProfilePageQuery($id: String!) {
    profile(id: $id) {
      id
      firstName
      lastName
      age
      email
    }
  }
`;

type ParamsProps = {
    id: string
}

export let loader = async ({ params }) => {
  const { id } :ParamsProps = params;

  const graphcms = new GraphQLClient(
    "http://localhost:4000"
  );

  const { profile } = await graphcms.request(GetProfileById, {
    id,
  });

  console.log(profile)
  return json({ profile });
};

export default function ProfilePage() {
    let data = useLoaderData();
  
    const { profile } = data;
    return (
      <>
        <h1>{profile.firstName} {profile.lastName}</h1>
        <p>{profile.age}</p>
        <p>{profile.email}</p>


        <Link to="/profiles">Profiles</Link> <br />
        <Link to="/">Home</Link>
      </>
    );
  }