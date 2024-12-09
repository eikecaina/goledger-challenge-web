import {
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { PlayerContext } from '../../../contexts/PlayerContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Duration } from 'luxon'
import PlayButton from '../../ui/buttons/PlayButton'
import Image from 'next/image'
import IconButton from '../../ui/buttons/IconButton'
import TrackPrevIcon from '../../icons/TrackPrevIcon'
import TrackNextIcon from '../../icons/TrackNextIcon'
import VolumeIcon from '../../icons/VolumeIcon'
import VolumeMuteIcon from '../../icons/VolumeIconMute'

interface PlayerProps extends HTMLAttributes<HTMLDivElement> {}

function Player({ className, ...rest }: PlayerProps) {
  const {
    trackList,
    currentTrackIndex,
    isPlaying,
    trackListIsEmpty,
    hasPrevious,
    hasNext,
    setPlayingState,
    playNext,
    playPrevious,
    togglePlay,
  } = useContext(PlayerContext)

  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const isMuted = useMemo(() => volume === 0, [volume])

  const handleChangeMute = useCallback(() => {
    if (isMuted) {
      setVolume(100)
    } else {
      setVolume(0)
    }
  }, [isMuted])

  return (
    <div className={classNames(styles.root, className)} {...rest}>
      <footer>
        <div className={styles.footer_left}>
          {!trackListIsEmpty && (
            <>
              <Image
                src={trackList?.[currentTrackIndex]?.artworkUrl100 || ''}
                alt={trackList?.[currentTrackIndex]?.artistName}
                width={56}
                height={56}
              />
              <div>
                <span title={trackList?.[currentTrackIndex]?.trackName}>
                  {trackList?.[currentTrackIndex]?.trackName}
                </span>
                <p title={trackList?.[currentTrackIndex]?.artistName}>
                  {trackList?.[currentTrackIndex]?.artistName}
                </p>
              </div>
            </>
          )}
        </div>
        <div className={styles.footer_center}>
          <div className={styles.player_btns}>
            <IconButton
              size="sm"
              variant="transparent"
              disabled={!hasPrevious}
              icon={<TrackPrevIcon />}
              onClick={playPrevious}
            />
            <PlayButton
              isPlaying={isPlaying}
              disabled={trackListIsEmpty}
              size="sm"
              variant="light"
              onClick={togglePlay}
            />
            <IconButton
              size="sm"
              variant="transparent"
              disabled={!hasNext}
              icon={<TrackNextIcon />}
              onClick={playNext}
            />
          </div>
          <div className={styles.player_bar}>
            <span>{Duration.fromMillis(currentTime * 1000).toFormat('mm:ss')}</span>
            <Slider
              className={styles.slider}
              min={0}
              max={audioRef?.current?.duration || 0}
              value={currentTime}
              range={false}
              // allowCross={false}
              onChange={(currentTime) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = currentTime as number
                  setCurrentTime(currentTime as number)
                }
              }}
            />
            <span>
              {Duration.fromMillis((audioRef.current?.duration || 0) * 1000).toFormat(
                'mm:ss'
              )}
            </span>
          </div>
          <audio
            ref={audioRef}
            src={trackList?.[currentTrackIndex]?.previewUrl}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={playNext}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          />
        </div>
        <div className={styles.footer_right}>
          <IconButton
            variant="transparent"
            size="sm"
            icon={isMuted ? <VolumeMuteIcon /> : <VolumeIcon />}
            onClick={handleChangeMute}
          />
          <span>
            <Slider
              className={styles.slider}
              min={0}
              max={100}
              value={volume}
              range={false}
              // allowCross={false}
              onChange={(volume) => {
                setVolume(volume as number)
              }}
            />
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Player
