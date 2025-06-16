import React from 'react'
import { FILEURLPRE } from '../../components/other/Defaulturl';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';


interface VideoComponentProps{
    title:string;
    url:string
}



function VideoComponent({title,url}:VideoComponentProps) {
  return (
   <MediaPlayer title={title} src={`${FILEURLPRE}/${url}`}>
  <MediaProvider />
  <DefaultVideoLayout thumbnails="back.jpg" icons={defaultLayoutIcons} />
</MediaPlayer>
  )
}

export default VideoComponent
