import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Child, calculateAge } from "@/lib/api"

const childSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    birthdate: z.string().min(1, "Birth date is required"),
    gender: z.string().optional(),
    notes: z.string().optional(),
    emergency_contact_name: z.string().min(1, "Emergency contact name is required"),
    emergency_contact_email: z.string()
        .min(1, "Emergency contact email is required")
        .email("Invalid email format"),
    emergency_contact_phone: z.string().min(1, "Emergency contact phone is required"),
    is_participant: z.boolean().default(false),
}).refine((data) => {
    // Validate that child is under 18 years old
    const age = calculateAge(data.birthdate);
    return age < 18;
}, {
    message: "Child must be under 18 years old",
    path: ["birthdate"],
})

type ChildFormValues = z.infer<typeof childSchema>

interface ChildCardProps {
    child?: Child
    onSave: (data: ChildFormValues) => Promise<void>
    onDelete?: () => Promise<void>
    onCancel?: () => void
    isNew?: boolean
}

export function ChildCard({ child, onSave, onDelete, onCancel, isNew = false }: ChildCardProps) {
    const [isEditing, setIsEditing] = useState(isNew)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const form = useForm<ChildFormValues>({
        resolver: zodResolver(childSchema),
        defaultValues: {
            first_name: child?.first_name || "",
            last_name: child?.last_name || "",
            birthdate: child?.birthdate || "",
            gender: child?.gender || "other",
            notes: child?.notes || "",
            emergency_contact_name: child?.emergency_contact_name || "",
            emergency_contact_email: child?.emergency_contact_email || "",
            emergency_contact_phone: child?.emergency_contact_phone || "",
            is_participant: child?.is_participant || false,
        },
    })

    const onSubmit = async (data: ChildFormValues) => {
        setIsSaving(true)
        try {
            await onSave(data)
            setIsEditing(false)
        } catch (error) {
            console.error("Failed to save child:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!onDelete) return
        if (!confirm("Are you sure you want to remove this child profile?")) return

        setIsDeleting(true)
        try {
            await onDelete()
        } catch (error) {
            console.error("Failed to delete child:", error)
        } finally {
            setIsDeleting(false)
        }
    }

    if (!isEditing && !isNew) {
        return (
            <Card className="border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-lg font-semibold text-purple-900">
                                {child?.first_name} {child?.last_name}
                            </CardTitle>
                            <CardDescription>
                                Born: {child?.birthdate ? new Date(child.birthdate).toLocaleDateString() : 'N/A'} • {child?.gender || 'Not specified'}
                            </CardDescription>
                        </div>
                        {child?.is_participant && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Participant
                            </span>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 space-y-1">
                    <p><span className="font-medium">Emergency Contact:</span> {child?.emergency_contact_name}</p>
                    {child?.notes && <p><span className="font-medium">Notes:</span> {child?.notes}</p>}
                </CardContent>
                <CardFooter className="pt-2 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                    {onDelete && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4">
                <CardTitle className="text-lg text-purple-900">{isNew ? "Add Child" : "Edit Child"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input {...form.register("first_name")} placeholder="First Name" />
                            {form.formState.errors.first_name && (
                                <p className="text-xs text-red-500">{form.formState.errors.first_name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input {...form.register("last_name")} placeholder="Last Name" />
                            {form.formState.errors.last_name && (
                                <p className="text-xs text-red-500">{form.formState.errors.last_name.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="birthdate">Birth Date</Label>
                            <Input
                                type="date"
                                {...form.register("birthdate")}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {form.formState.errors.birthdate && (
                                <p className="text-xs text-red-500">{form.formState.errors.birthdate.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                onValueChange={(value) => form.setValue("gender", value)}
                                defaultValue={form.getValues("gender")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Emergency Contact</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Input {...form.register("emergency_contact_name")} placeholder="Name" />
                                {form.formState.errors.emergency_contact_name && (
                                    <p className="text-xs text-red-500">{form.formState.errors.emergency_contact_name.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Input {...form.register("emergency_contact_email")} placeholder="Email" type="email" />
                                {form.formState.errors.emergency_contact_email && (
                                    <p className="text-xs text-red-500">{form.formState.errors.emergency_contact_email.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Input {...form.register("emergency_contact_phone")} placeholder="Phone" type="tel" />
                                {form.formState.errors.emergency_contact_phone && (
                                    <p className="text-xs text-red-500">{form.formState.errors.emergency_contact_phone.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Allergies, etc.)</Label>
                        <Textarea {...form.register("notes")} placeholder="Any medical conditions or notes..." />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_participant"
                            checked={form.watch("is_participant")}
                            onCheckedChange={(checked) => form.setValue("is_participant", checked as boolean)}
                        />
                        <Label htmlFor="is_participant" className="cursor-pointer">
                            This child can participate in activities
                        </Label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-purple-100">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Child
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
