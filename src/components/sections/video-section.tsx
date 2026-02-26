// src/components/sections/video-section.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2,
  FileText,
  Download,
  Clock,
  ChevronRight,
  Film,
  Monitor,
  Settings,
  SkipForward,
  SkipBack
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { VIDEOS } from "@/lib/constants";
import videosContent from "@/content/videos.json";

interface VideoPlayerProps {
  title: string;
  duration: string;
  videoSrc: string;
  transcript: {
    time: number;
    text: string;
    highlight?: boolean;
  }[];
}

function VideoPlayer({ title, duration, videoSrc, transcript }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      
      // Update active transcript
      const currentIndex = transcript.findIndex((item, index) => {
        const nextItem = transcript[index + 1];
        if (nextItem) {
          return video.currentTime >= item.time && video.currentTime < nextItem.time;
        }
        return video.currentTime >= item.time;
      });
      
      if (currentIndex !== -1) {
        setActiveTranscriptIndex(currentIndex);
      }
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [transcript]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = (value[0] / 100) * videoDuration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 10, videoDuration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const changeSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50">
        {/* Video Container */}
        <div 
          className="relative aspect-video bg-black rounded-t-lg overflow-hidden group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            playsInline
            onClick={togglePlayPause}
          />
          
          {/* Center Play/Pause Overlay - Only show when paused */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
                onClick={togglePlayPause}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
              >
                {/* Progress Bar */}
                <div className="mb-3">
                  <Slider
                    value={[videoDuration ? (currentTime / videoDuration) * 100 : 0]}
                    onValueChange={handleSeek}
                    className="cursor-pointer"
                    max={100}
                    step={0.1}
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlayPause}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={skipBackward}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      <SkipBack className="w-4 h-4 text-white" />
                    </button>

                    <button
                      onClick={skipForward}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      <SkipForward className="w-4 h-4 text-white" />
                    </button>

                    <span className="text-white text-sm mx-2">
                      {formatTime(currentTime)} / {formatTime(videoDuration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>

                    <button
                      onClick={handleFullscreen}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      <Maximize2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video Info Section */}
        <div className="p-6 space-y-4">
          {/* Title and Duration */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {duration}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {playbackSpeed}x Speed
                </Badge>
              </div>
            </div>

            {/* Settings Button */}
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              {/* Speed Settings Dropdown */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[100px] z-50"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={cn(
                          "w-full text-left px-3 py-1.5 rounded text-sm hover:bg-accent transition-colors",
                          playbackSpeed === speed && "bg-accent"
                        )}
                      >
                        {speed}x
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between pt-2 border-t">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={handleVolumeChange}
                className="w-24"
                max={100}
              />
            </div>

            {/* Transcript Toggle */}
            <Button
              variant={showTranscript ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Transcript
            </Button>
          </div>

          {/* Transcript Section */}
          <AnimatePresence>
            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Transcript</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success("Transcript downloaded!")}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-1 text-sm">
                  {transcript.map((item, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "p-2 rounded cursor-pointer transition-colors",
                        activeTranscriptIndex === index
                          ? "bg-accent"
                          : "hover:bg-accent/50"
                      )}
                      onClick={() => {
                        const video = videoRef.current;
                        if (video) {
                          video.currentTime = item.time;
                          setCurrentTime(item.time);
                        }
                      }}
                    >
                      <span className="text-xs text-muted-foreground mr-2">
                        {formatTime(item.time)}
                      </span>
                      <span className={cn(
                        item.highlight && "font-medium"
                      )}>
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

export function VideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound } = useSoundEffect();

  return (
    <section id="video-section" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Subtle Background - monochrome */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/3" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f05_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f05_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <Monitor className="w-3 h-3 mr-1" />
            Video Introduction
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get to Know Me <span className="text-gradient">Better</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {videosContent.sectionSubtitle}
          </p>
        </motion.div>

        {/* Video Tabs */}
        <Tabs defaultValue={VIDEOS[0]?.id || "about-me"} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            {VIDEOS.map((video) => (
              <TabsTrigger
                key={video.id}
                value={video.id}
                onMouseEnter={playHoverSound}
                className="data-[state=active]:bg-secondary data-[state=active]:border-border"
              >
                <Film className="w-4 h-4 mr-2" />
                {video.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {VIDEOS.map((video) => (
            <TabsContent key={video.id} value={video.id}>
              <VideoPlayer {...video} />
              
              {/* Chapter List */}
              {video.chapters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50"
                >
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Video Chapters
                  </h4>
                  <div className="space-y-2">
                    {video.chapters.map((chapter, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <span className="font-mono text-xs">
                          {Math.floor(chapter.time / 60)}:{(chapter.time % 60).toString().padStart(2, '0')}
                        </span>
                        <ChevronRight className="w-3 h-3" />
                        <span>{chapter.title}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}