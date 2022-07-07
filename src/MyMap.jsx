import { Map } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import { useState } from "react"
// import css

export default function MyMap() {
  const [center, setCenter] = useState([41.6941, 44.8337])
  const [zoom, setZoom] = useState(11)
  const maptilerProvider = maptiler('QUSx1i2HvrLQCCvXImBD', 'streets')

  return (
    <Map
    provider={maptilerProvider}
    height={'80vh'}
    defaultCenter={center}
    defaultZoom={zoom}
    onBoundsChanged={({ center, zoom }) => { 
      setCenter(center) 
      setZoom(zoom) 
    }}
    />
  )
}