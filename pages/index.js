import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

function ProfileSidebar(properties) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
    <p>
      <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
        @{properties.githubUser}
      </a>
    </p>  
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(properties) {
  return (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {properties.title} ({properties.items.length})
        </h2>
          <ul>
           {properties.items.map((currentItem) => {
              return (
            <li key={currentItem}>
                 <a href={`/users/${currentItem}`} key={currentItem}>
                  <img src={`https://github.com/${currentItem}.png`} />
                    <span>{currentItem.title}</span>
                </a>
            </li>
                    )
                  })}
          </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const randomUser = 'renantoka';
  const [communities, setCommunities] = React.useState([{
    id: '123412512421',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const favoritePeople = [
    'heruscode',
    'omariosouto',
    'PandaZIM',
    'fernandohenriq',
    'lutchenca',
    'gabrielbugarelli'
  ]

  const [followers, setFollowers] = React.useState([]);
    React.useEffect(function() {
      fetch('https://api.github.com/users/renantoka/followers')
        .then(function (serverResponse) {
          return serverResponse.json();
        })
        .then(function(fullResponse) {
          setFollowers(fullResponse);
        })
}, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={randomUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {randomUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateaCommunity(e) {
              e.preventDefault();
              const formData = new FormData(e.target);

              const community = {
                id: new Date().toISOString,
                title: formData.get('title'),
                image: formData.get('image')
              }
              
              const communitiesUpdated = [...communities, community];
              setCommunities(communitiesUpdated)
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa"
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
            
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((currentItem) => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`} key={currentItem}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
             Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((currentItem) => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/users/${currentItem.title}`}>
                      <img src={currentItem.image} />
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
} 