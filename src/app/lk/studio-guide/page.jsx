import StudioGuidePage from "@/Sections/StudioGuide/StudioGuidePage";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/studioGuide`, {
    cache: 'no-store',
    // next: {
    //   revalidate: 60,
    // },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const StudioGuide = async () => {
  const { data } = await getData()

  return (
    <>
      {data && <StudioGuidePage data={data.modules}/>}
    </>
  )
}

export default StudioGuide