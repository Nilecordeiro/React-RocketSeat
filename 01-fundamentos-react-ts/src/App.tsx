import { Header } from './components/Header';
import { Post, PostProps } from './components/Post';
import { Sidebar } from './components/Sidebar';
import styles from './App.module.css';

import './global.css';

interface Post extends PostProps {
  id: number;
}

const posts : Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Rodrigo A',
      role: 'Dev Pl II'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀', },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2024-11-25 05:00:00'),
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Usuário XPTO',
      role: 'Dev Pl IIII'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀', },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2024-11-20 05:00:00'),
  },


];


 function App() {

  return (
    <>
      <div>
        <Header />

        <div className={styles.wrapper}>
          <Sidebar />
          <main>
            {posts.map(post => {
              return (
                <Post 
                  key={post.id}
                  author = {post.author}
                  content = {post.content}
                  publishedAt = {post.publishedAt}
                />
              )
            })}
          </main>
        </div>

        
      </div>
      
    </>
  )
}



export default App
