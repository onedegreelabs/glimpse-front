import Container from '@/components/Container/Container';

export default function Users({params}: {params: {id: string}}) {
  console.log('params', params);
  return (
    <Container>
      <div>유저프로필</div>
    </Container>
  );
}
