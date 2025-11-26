"use client"; // MANDATORY: This directive tells Next.js to render this component on the client, allowing the use of hooks like useState.

import {
    Card,
    Stack,
    Title,
    Text,
    Grid,
    Paper,
    ThemeIcon,
    Group,
    Progress,
    Button,
    Table, // Added Table import
    Badge, // Added Badge import
} from "@mantine/core"
import { IconUserCircle, IconChartBar, IconClock, IconCalendarCheck, IconClockHour3, IconTargetArrow } from "@tabler/icons-react"
import { useState } from "react"

// Initial Mock data for a standard user (moved outside component for clarity)
const initialUserStats = [
    { id: 'projects', title: "Projects Completed", value: 4, color: "blue", icon: IconCalendarCheck, progress: 80 },
    { id: 'hours', title: "Hours Logged This Week", value: 15.5, color: "teal", icon: IconClock, progress: 62 },
    { id: 'performance', title: "Performance Score", value: 85, color: "yellow", icon: IconChartBar, progress: 85 }, // Value is now a number for interaction
]

// New mock data for the Recent Activity Table
const mockActivityData = [
    { task: 'Update API Documentation', project: 'Platform Relaunch', status: 'Pending Review', date: '2025-11-25', priority: 'High' },
    { task: 'Refactor Auth Service', project: 'Security Audit', status: 'Completed', date: '2025-11-24', priority: 'High' },
    { task: 'Fix mobile CSS bugs', project: 'Client Portal', status: 'In Progress', date: '2025-11-23', priority: 'Medium' },
    { task: 'Q3 Report Final Draft', project: 'Reporting', status: 'Completed', date: '2025-11-20', priority: 'Low' },
]

function getStatusColor(status: string) {
    switch (status) {
        case 'Completed': return 'green';
        case 'Pending Review': return 'orange';
        case 'In Progress': return 'blue';
        default: return 'gray';
    }
}

function UserStatCard({ stat }: { stat: (typeof initialUserStats)[0] }) {
    return (
        <Paper withBorder p="md" radius="md">
            <Group justify="space-between" mb="xs">
                <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {stat.title}
                </Text>
                <ThemeIcon color={stat.color} variant="light" size={30} radius="md">
                    <stat.icon size={18} stroke={1.5} />
                </ThemeIcon>
            </Group>
            
            <Title order={2} fw={700} c={stat.color}>
                {stat.id === 'performance' ? `${stat.value}%` : stat.value}
            </Title>
            
            <Progress value={stat.progress} color={stat.color} size="sm" mt="sm" />
            <Text size="xs" c="dimmed" mt={3}>
                {stat.id === 'hours' ? `Goal: 25 hrs` : 'Target: 100%'}
            </Text>
        </Paper>
    )
}

function PerformanceRing({ score }: { score: number }) {
    return (
        // FIXED: Removed the unsupported 'roundCaps' prop from Progress.Root
        <Progress.Root size={150}>
            <Progress.Section value={score} color="yellow">
                <Progress.Label>
                    <Stack align="center" justify="center" h="100%">
                        <Text size="xl" fw={700} c="yellow">
                            {score}%
                        </Text>
                        <Text size="xs" c="dimmed">
                            Score
                        </Text>
                    </Stack>
                </Progress.Label>
            </Progress.Section>
        </Progress.Root>
    )
}

function RecentActivityTable() {
    const rows = mockActivityData.map((item, index) => (
        <Table.Tr key={index}>
            <Table.Td fw={500}>{item.task}</Table.Td>
            <Table.Td>{item.project}</Table.Td>
            <Table.Td>
                <Badge color={getStatusColor(item.status)} variant="light">
                    {item.status}
                </Badge>
            </Table.Td>
            <Table.Td>{item.date}</Table.Td>
            <Table.Td>
                <Badge color={item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'orange' : 'gray'} variant="filled">
                    {item.priority}
                </Badge>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card withBorder shadow="sm" radius="md" p="xl" style={{ flexGrow: 1 }}>
            <Title order={3} mb="md">
                Recent Task Activity
            </Title>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Task</Table.Th>
                        <Table.Th>Project</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Priority</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Text size="sm" c="dimmed" mt="md" style={{ textAlign: 'right' }}>
                <a href="#" style={{ color: 'var(--mantine-color-blue-6)' }}>View All Activity</a>
            </Text>
        </Card>
    );
}

function GoalsTargetModule() {
    return (
        <Card withBorder shadow="sm" radius="md" style={{ flexGrow: 1 }}>
            <Group>
                <ThemeIcon color="violet" size={40} radius="md">
                    <IconTargetArrow size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={3}>
                    Quarterly Goals
                </Title>
            </Group>
            <Stack gap="xs" mt="md">
                <Text size="sm">
                    **Goal 1:** Achieve 90% client satisfaction score.
                </Text>
                <Progress value={88} color="violet" size="lg" />
                <Text size="sm">
                    **Goal 2:** Complete 2 new certifications. (1/2 done)
                </Text>
                <Progress value={50} color="grape" size="lg" />
            </Stack>
            <Text size="xs" c="dimmed" mt="sm">
                Next review date: December 15th
            </Text>
        </Card>
    );
}


export function UserDashboard() {
    const [stats, setStats] = useState(initialUserStats)
    const userName = "Standard User" 
    const performanceStat = stats.find(s => s.id === 'performance')!

    // Function to simulate logging time
    const handleLogHours = () => {
        setStats(prevStats => prevStats.map(stat => {
            if (stat.id === 'hours') {
                // Simulate adding 0.5 hours
                const newHours = stat.value + 0.5
                const newProgress = Math.min((newHours / 25) * 100, 100) // Max 25 hours
                return {
                    ...stat,
                    value: newHours,
                    progress: newProgress
                }
            }
            return stat
        }))
    }

    return (
        <Stack gap="lg" p="md">
            {/* Header Card with Quick Action */}
            <Card withBorder shadow="sm" radius="md" p="xl" bg="gray.0">
                <Group justify="space-between" align="center">
                    <Group>
                        <IconUserCircle size={48} stroke={1.5} />
                        <Stack gap={0}>
                            <Title order={1}>Hello, {userName}!</Title>
                            <Text c="dimmed">Welcome to your personalized dashboard. Here's a quick look at your activity.</Text>
                        </Stack>
                    </Group>
                    <Button 
                        onClick={handleLogHours}
                        leftSection={<IconClockHour3 size={18} />}
                        variant="filled"
                        color="teal"
                        radius="md"
                    >
                        Log 0.5 Hours
                    </Button>
                </Group>
            </Card>

            {/* Quick Stats Grid */}
            <Grid>
                {/* Map over the first two stats */}
                {stats.filter(s => s.id !== 'performance').map((stat) => (
                    <Grid.Col key={stat.title} span={{ base: 12, sm: 6 }}>
                        <UserStatCard stat={stat} />
                    </Grid.Col>
                ))}
            </Grid>
            
            {/* Main Content Row: Performance, Goals, Announcements */}
            <Grid gutter="lg">
                {/* Performance Visualization (Left Column, unchanged) */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card withBorder shadow="sm" radius="md" p="xl" style={{ textAlign: 'center' }}>
                        <Title order={3} mb="lg">
                            Performance Snapshot
                        </Title>
                        <PerformanceRing score={performanceStat.value as number} />
                        <Text size="sm" c="dimmed" mt="md">
                            Your score is currently excellent. Keep it up!
                        </Text>
                    </Card>
                </Grid.Col>

                {/* Goals and Announcements (Right Column) */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="md" h="100%">
                        {/* NEW: Goals/Targets Module */}
                        <GoalsTargetModule />

                        {/* Announcements (moved down) */}
                        <Card withBorder shadow="sm" radius="md" style={{ flexGrow: 1 }}>
                            <Title order={3} mb="xs">
                                Announcements
                            </Title>
                            <Text c="dimmed" size="sm">
                                New project guidelines have been released. Please review the documents by end of day.
                            </Text>
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>

            {/* NEW: Full-width Recent Activity Table */}
            <RecentActivityTable />

        </Stack>
    )
}
