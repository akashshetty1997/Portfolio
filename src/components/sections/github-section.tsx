// src/components/sections/github-section.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Activity, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "@/hooks/use-sound";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
}

export function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playClickSound, playHoverSound } = useSoundEffect();
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fallback mock data generator
    const generateMockData = (): GitHubData => {
      const contributions: ContributionDay[] = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const baseChance = isWeekend ? 0.3 : 0.7;
        const hasContribution = Math.random() < baseChance;
        const count = hasContribution ? Math.floor(Math.random() * 4) + 1 : 0;
        contributions.push({
          date: date.toISOString().split("T")[0],
          contributionCount: count,
          color: getContributionColor(count),
        });
      }
      return {
        contributions,
        totalContributions: contributions.reduce(
          (sum, day) => sum + day.contributionCount,
          0
        ),
      };
    };

    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // GitHub GraphQL API query for contribution data
        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: { username: "akashshetty1997" },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const contributionCalendar =
          data.data.user.contributionsCollection.contributionCalendar;
        const contributions = contributionCalendar.weeks.flatMap(
          (week: { contributionDays: ContributionDay[] }) => week.contributionDays
        );

        setGithubData({
          contributions,
          totalContributions: contributionCalendar.totalContributions,
        });
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub data"
        );

        // Fallback to mock data if API fails
        const mockData = generateMockData();
        setGithubData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Organize contributions into weeks for display
  const organizeIntoWeeks = (
    contributions: ContributionDay[]
  ): ContributionDay[][] => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push({ ...day, date: date.toISOString().split("T")[0] });
      if (index === contributions.length - 1) {
        weeks.push(currentWeek);
      }
    });
    return weeks;
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Monochrome contribution color levels
  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-muted hover:bg-muted/80";
    if (count === 1)
      return "bg-foreground/20 hover:bg-foreground/30";
    if (count === 2)
      return "bg-foreground/40 hover:bg-foreground/50";
    if (count === 3)
      return "bg-foreground/60 hover:bg-foreground/70";
    return "bg-foreground/80 hover:bg-foreground/90";
  };

  // Get organized data for display
  const contributionData = githubData
    ? organizeIntoWeeks(githubData.contributions)
    : [];
  const totalContributions = githubData ? githubData.totalContributions : 0;

  return (
    <section id="github" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Standardized Background - SAME as other sections */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - standardized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1.5" variant="outline">
            <Github className="w-3 h-3 mr-2" />
            Open Source
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contributing to open source and building in public
          </p>
        </motion.div>

        {/* Contribution Graph Card - standardized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      Contribution Activity
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {totalContributions} contributions in the last year
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading GitHub contributions...</span>
                  </div>
                </div>
              ) : error && !githubData ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      Unable to load GitHub data
                    </p>
                    <p className="text-xs text-muted-foreground">{error}</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Month labels */}
                  <div className="flex gap-[3px] mb-2 ml-9">
                    {months.map((month) => (
                      <div
                        key={month}
                        className="text-xs text-muted-foreground"
                        style={{ width: `${100 / 12}%` }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {/* Day labels */}
                    <div className="flex flex-col gap-[3px] text-xs text-muted-foreground pr-2">
                      <div className="h-3"></div>
                      {days.map((day, index) => (
                        <div key={day} className="h-3 flex items-center">
                          {index % 2 === 1 && day.slice(0, 3)}
                        </div>
                      ))}
                    </div>

                    {/* Contribution Grid */}
                    <div className="flex-1 overflow-x-auto">
                      <div className="flex gap-[3px] min-w-max">
                        {contributionData.map(
                          (week: ContributionDay[], weekIndex: number) => (
                            <div
                              key={weekIndex}
                              className="flex flex-col gap-[3px]"
                            >
                              {week.map((day: ContributionDay, dayIndex: number) => (
                                <motion.div
                                  key={`${weekIndex}-${dayIndex}`}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={
                                    isInView ? { opacity: 1, scale: 1 } : {}
                                  }
                                  transition={{
                                    delay:
                                      0.3 + (weekIndex * 7 + dayIndex) * 0.001,
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                  whileHover={{ scale: 1.3 }}
                                  onHoverStart={playHoverSound}
                                >
                                  <div
                                    className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${
                                      day.color ||
                                      getContributionColor(
                                        day.contributionCount
                                      )
                                    }`}
                                    title={`${
                                      day.contributionCount
                                    } contributions on ${new Date(
                                      day.date
                                    ).toLocaleDateString()}`}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Legend */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(
                          level
                        )}`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>

                <a
                  href="https://github.com/akashshetty1997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                >
                  Learn how we count contributions →
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* View Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            size="lg"
            onClick={() => {
              playClickSound();
              window.open("https://github.com/akashshetty1997", "_blank");
            }}
            onMouseEnter={playHoverSound}
            className="group"
            variant="outline"
          >
            <Github className="w-5 h-5 mr-2" />
            View GitHub Profile
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
