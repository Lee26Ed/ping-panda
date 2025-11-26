"use client"

import {
    Avatar,
    Badge,
    Card,
    Grid,
    Group,
    Paper,
    Progress,
    SimpleGrid,
    Stack,
    Table,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core"
import {
    IconArrowUpRight,
    IconArrowDownRight,
    IconUsers,
    IconShoppingCart,
    IconCoin,
    IconActivity,
} from "@tabler/icons-react"

// Mock data
const statsData = [
    {
        title: "Total Users",
        value: "13,456",
        diff: 12,
        icon: IconUsers,
        color: "blue",
    },
    {
        title: "Total Sales",
        value: "$45,678",
        diff: 8,
        icon: IconShoppingCart,
        color: "green",
    },
    {
        title: "Revenue",
        value: "$89,234",
        diff: -3,
        icon: IconCoin,
        color: "yellow",
    },
    {
        title: "Active Sessions",
        value: "2,345",
        diff: 18,
        icon: IconActivity,
        color: "violet",
    },
]

const recentOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        email: "john@example.com",
        amount: "$234.50",
        status: "completed",
        date: "Nov 23, 2025",
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        email: "jane@example.com",
        amount: "$567.80",
        status: "pending",
        date: "Nov 23, 2025",
    },
    {
        id: "ORD-003",
        customer: "Bob Johnson",
        email: "bob@example.com",
        amount: "$123.45",
        status: "completed",
        date: "Nov 22, 2025",
    },
    {
        id: "ORD-004",
        customer: "Alice Brown",
        email: "alice@example.com",
        amount: "$789.00",
        status: "processing",
        date: "Nov 22, 2025",
    },
    {
        id: "ORD-005",
        customer: "Charlie Wilson",
        email: "charlie@example.com",
        amount: "$456.20",
        status: "completed",
        date: "Nov 21, 2025",
    },
]

const topProducts = [
    { name: "Premium Widget", sales: 1234, revenue: "$24,680", growth: 23 },
    { name: "Starter Kit", sales: 987, revenue: "$19,740", growth: 15 },
    { name: "Pro Package", sales: 756, revenue: "$37,800", growth: -5 },
    { name: "Basic Plan", sales: 543, revenue: "$5,430", growth: 8 },
]

function StatCard({ stat }: { stat: (typeof statsData)[0] }) {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight
    const diffColor = stat.diff > 0 ? "teal" : "red"

    return (
        <Paper withBorder p='md' radius='md'>
            <Group justify='space-between'>
                <div>
                    <Text c='dimmed' size='xs' tt='uppercase' fw={700}>
                        {stat.title}
                    </Text>
                    <Text fw={700} size='xl'>
                        {stat.value}
                    </Text>
                </div>
                <ThemeIcon
                    color={stat.color}
                    variant='light'
                    size={38}
                    radius='md'
                >
                    <stat.icon size={22} stroke={1.5} />
                </ThemeIcon>
            </Group>
            <Group mt='md' gap='xs'>
                <Text c={diffColor} size='sm' fw={500} component='span'>
                    <DiffIcon
                        size={16}
                        stroke={1.5}
                        style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ marginLeft: 2 }}>
                        {Math.abs(stat.diff)}%
                    </span>
                </Text>
                <Text c='dimmed' size='sm'>
                    vs last month
                </Text>
            </Group>
        </Paper>
    )
}

function getStatusColor(status: string) {
    switch (status) {
        case "completed":
            return "green"
        case "pending":
            return "yellow"
        case "processing":
            return "blue"
        default:
            return "gray"
    }
}

export function AdminDashboard() {
    return (
        <Stack gap='lg' p='md'>
            <Title order={1}>Dashboard Overview</Title>

            {/* Stats Grid */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
                {statsData.map((stat) => (
                    <StatCard key={stat.title} stat={stat} />
                ))}
            </SimpleGrid>

            <Grid>
                {/* Top Products */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card withBorder shadow='sm' radius='md'>
                        <Card.Section withBorder inheritPadding py='xs'>
                            <Title order={3}>Top Products</Title>
                        </Card.Section>

                        <Stack gap='md' mt='md'>
                            {topProducts.map((product) => (
                                <div key={product.name}>
                                    <Group justify='space-between' mb={5}>
                                        <Text size='sm' fw={500}>
                                            {product.name}
                                        </Text>
                                        <Badge
                                            color={
                                                product.growth > 0
                                                    ? "green"
                                                    : "red"
                                            }
                                            variant='light'
                                        >
                                            {product.growth > 0 ? "+" : ""}
                                            {product.growth}%
                                        </Badge>
                                    </Group>
                                    <Progress
                                        value={(product.sales / 1500) * 100}
                                        color={
                                            product.growth > 0 ? "green" : "red"
                                        }
                                        size='sm'
                                    />
                                    <Group justify='space-between' mt={5}>
                                        <Text size='xs' c='dimmed'>
                                            {product.sales} sales
                                        </Text>
                                        <Text size='xs' c='dimmed'>
                                            {product.revenue}
                                        </Text>
                                    </Group>
                                </div>
                            ))}
                        </Stack>
                    </Card>
                </Grid.Col>

                {/* Recent Activity */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card withBorder shadow='sm' radius='md' h='100%'>
                        <Card.Section withBorder inheritPadding py='xs'>
                            <Title order={3}>Recent Activity</Title>
                        </Card.Section>

                        <Stack gap='md' mt='md'>
                            <Group>
                                <Avatar color='blue' radius='xl'>
                                    JD
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text size='sm' fw={500}>
                                        John Doe placed an order
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                        2 minutes ago
                                    </Text>
                                </div>
                            </Group>

                            <Group>
                                <Avatar color='green' radius='xl'>
                                    JS
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text size='sm' fw={500}>
                                        Jane Smith completed payment
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                        15 minutes ago
                                    </Text>
                                </div>
                            </Group>

                            <Group>
                                <Avatar color='violet' radius='xl'>
                                    BJ
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text size='sm' fw={500}>
                                        Bob Johnson left a review
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                        1 hour ago
                                    </Text>
                                </div>
                            </Group>

                            <Group>
                                <Avatar color='orange' radius='xl'>
                                    AB
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text size='sm' fw={500}>
                                        Alice Brown registered
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                        2 hours ago
                                    </Text>
                                </div>
                            </Group>

                            <Group>
                                <Avatar color='pink' radius='xl'>
                                    CW
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text size='sm' fw={500}>
                                        Charlie Wilson updated profile
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                        3 hours ago
                                    </Text>
                                </div>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>

            {/* Recent Orders Table */}
            <Card withBorder shadow='sm' radius='md'>
                <Card.Section withBorder inheritPadding py='xs'>
                    <Title order={3}>Recent Orders</Title>
                </Card.Section>

                <Table striped highlightOnHover mt='md'>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Order ID</Table.Th>
                            <Table.Th>Customer</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Date</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {recentOrders.map((order) => (
                            <Table.Tr key={order.id}>
                                <Table.Td>
                                    <Text size='sm' fw={500}>
                                        {order.id}
                                    </Text>
                                </Table.Td>
                                <Table.Td>{order.customer}</Table.Td>
                                <Table.Td>
                                    <Text size='sm' c='dimmed'>
                                        {order.email}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size='sm' fw={500}>
                                        {order.amount}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={getStatusColor(order.status)}
                                        variant='light'
                                    >
                                        {order.status}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Text size='sm' c='dimmed'>
                                        {order.date}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </Stack>
    )
}
