'use client'

import { useState, useMemo } from 'react'
import {
  Calendar,
  CheckSquare,
  Wallet,
  Users,
  Plus,
  Trash2,
  Check,
  Circle,
  Heart,
  Clock,
  TrendingUp,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  PartyPopper,
  Cake,
  X,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useMarketplace } from '@/lib/store'
import {
  CITIES,
  CHECKLIST_TEMPLATE,
  BUDGET_CATEGORIES,
  BUDGET_ALLOCATION,
  GUEST_GROUPS,
  formatPKR,
  formatPKRShort,
} from '@/lib/constants'
import { cn } from '@/lib/utils'

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const target = new Date(dateStr).getTime()
  const now = Date.now()
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}

function CountdownHero() {
  const { weddingPlan } = useMarketplace()
  const days = daysUntil(weddingPlan.weddingDate)

  if (!weddingPlan.weddingDate) {
    return (
      <Card className="border-dashed border-primary/30 bg-primary/5 p-8 text-center">
        <Calendar className="mx-auto h-10 w-10 text-primary/50" />
        <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
          Apni shaadi ki date set karein
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Countdown aur planning timeline ke liye date zaroori hai
        </p>
      </Card>
    )
  }

  const weddingDate = new Date(weddingPlan.weddingDate)
  const dateStr = weddingDate.toLocaleDateString('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary to-[#4D0712] p-6 md:p-8">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Heart className="h-4 w-4 text-white/80" />
            <span className="text-xs uppercase tracking-widest text-white/70">
              The Big Day
            </span>
          </div>
          <div className="mt-1 font-serif text-2xl font-bold text-white md:text-3xl">
            {weddingPlan.partner1Name && weddingPlan.partner2Name
              ? `${weddingPlan.partner1Name} & ${weddingPlan.partner2Name}`
              : 'Hamari Shaadi'}
          </div>
          <div className="mt-1 text-sm text-white/80">{dateStr}</div>
          {weddingPlan.city && (
            <div className="mt-0.5 text-xs text-white/60">📍 {weddingPlan.city}</div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {days !== null && days > 0 ? (
            <>
              <div className="text-center">
                <div className="font-serif text-5xl font-bold text-white md:text-6xl tabular-nums">
                  {days}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/70">
                  {days === 1 ? 'day' : 'days'} to go
                </div>
              </div>
              <PartyPopper className="hidden h-8 w-8 text-white/60 md:block" />
            </>
          ) : days === 0 ? (
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-white">Today!</div>
              <div className="text-xs text-white/70">Mubarak ho! 🎉</div>
            </div>
          ) : (
            <div className="text-center">
              <Cake className="mx-auto h-8 w-8 text-white/70" />
              <div className="text-xs text-white/70">Memories made 📸</div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function PlanSetupCard() {
  const { weddingPlan, setWeddingPlan } = useMarketplace()
  return (
    <Card className="border-border/60 p-5">
      <h3 className="font-serif text-lg font-semibold text-foreground">
        Wedding Details
      </h3>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Apni shaadi ki basic details set karein
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-xs">Partner 1 (Dulha/Dulhan)</Label>
          <Input
            value={weddingPlan.partner1Name}
            onChange={(e) => setWeddingPlan({ partner1Name: e.target.value })}
            placeholder="e.g. Ahmed"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Partner 2</Label>
          <Input
            value={weddingPlan.partner2Name}
            onChange={(e) => setWeddingPlan({ partner2Name: e.target.value })}
            placeholder="e.g. Ayesha"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Wedding Date</Label>
          <Input
            type="date"
            value={weddingPlan.weddingDate || ''}
            onChange={(e) => setWeddingPlan({ weddingDate: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">City</Label>
          <Select
            value={weddingPlan.city || 'all'}
            onValueChange={(v) => setWeddingPlan({ city: v === 'all' ? '' : v })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select city</SelectItem>
              {CITIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-3">
        <Label className="text-xs">Total Budget (PKR)</Label>
        <Input
          type="number"
          value={weddingPlan.totalBudget || ''}
          onChange={(e) => setWeddingPlan({ totalBudget: parseInt(e.target.value) || 0 })}
          placeholder="e.g. 1500000"
          className="mt-1"
        />
        {weddingPlan.totalBudget > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            ≈ {formatPKR(weddingPlan.totalBudget)}
          </p>
        )}
      </div>
    </Card>
  )
}

function ChecklistTab() {
  const { checklist, addChecklistItem, toggleChecklistItem, removeChecklistItem, resetChecklist } = useMarketplace()
  const [newText, setNewText] = useState('')
  const [newCategory, setNewCategory] = useState('Planning')

  const grouped = useMemo(() => {
    const groups: Record<string, typeof checklist> = {}
    checklist.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [checklist])

  const doneCount = checklist.filter((c) => c.done).length
  const progress = checklist.length > 0 ? (doneCount / checklist.length) * 100 : 0

  const loadTemplate = () => {
    const template = CHECKLIST_TEMPLATE.map((t) => ({
      ...t,
      id: `cl_tpl_${t.dueOffsetDays}_${Math.random().toString(36).slice(2, 6)}`,
      done: false,
      createdAt: new Date().toISOString(),
    }))
    resetChecklist(template)
    toast.success(`${template.length} tasks loaded from template!`)
  }

  return (
    <div className="space-y-4">
      {/* Progress overview */}
      <Card className="border-border/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Wedding Checklist
              </h3>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {doneCount} of {checklist.length} tasks complete
            </p>
          </div>
          <div className="text-right">
            <div className="font-serif text-2xl font-bold text-primary tabular-nums">
              {Math.round(progress)}%
            </div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              done
            </div>
          </div>
        </div>
        <Progress value={progress} className="mt-3 h-2" />
        {checklist.length === 0 && (
          <div className="mt-4 rounded-lg bg-accent/40 p-4 text-center">
            <p className="text-sm text-foreground">
              Apni planning shuru karein — template load karein ya custom task add karein.
            </p>
            <Button size="sm" className="mt-3" onClick={loadTemplate}>
              <Sparkles className="mr-1.5 h-4 w-4" /> Load 24-task template
            </Button>
          </div>
        )}
      </Card>

      {/* Add new task */}
      <Card className="border-border/60 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label className="text-xs">New task</Label>
            <Input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newText.trim()) {
                  addChecklistItem({ text: newText.trim(), category: newCategory, dueOffsetDays: 30 })
                  setNewText('')
                  toast.success('Task added')
                }
              }}
              placeholder="e.g. Book henna artist"
              className="mt-1"
            />
          </div>
          <div className="w-full sm:w-40">
            <Label className="text-xs">Category</Label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['Planning', 'Venue', 'Photography', 'Catering', 'Decor', 'Beauty', 'Attire', 'Entertainment', 'Invitations', 'Logistics', 'Guests', 'Events', 'Shopping', 'Personal'].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              if (!newText.trim()) return
              addChecklistItem({ text: newText.trim(), category: newCategory, dueOffsetDays: 30 })
              setNewText('')
              toast.success('Task added')
            }}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
        {checklist.length > 0 && (
          <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={loadTemplate}>
            Reset to template
          </Button>
        )}
      </Card>

      {/* Checklist grouped by category */}
      <div className="space-y-3">
        {Object.entries(grouped).map(([cat, items]) => (
          <Card key={cat} className="border-border/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{cat}</h4>
              <Badge variant="secondary" className="text-[10px]">
                {items.filter((i) => i.done).length}/{items.length}
              </Badge>
            </div>
            <div className="space-y-1.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-accent/40"
                >
                  <button
                    onClick={() => toggleChecklistItem(item.id)}
                    className="flex-shrink-0"
                    aria-label="Toggle task"
                  >
                    {item.done ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40 hover:text-primary" />
                    )}
                  </button>
                  <span
                    className={cn(
                      'flex-1 text-sm transition',
                      item.done ? 'text-muted-foreground line-through' : 'text-foreground'
                    )}
                  >
                    {item.text}
                  </span>
                  <span className="hidden items-center gap-1 text-[10px] text-muted-foreground sm:inline-flex">
                    <Clock className="h-3 w-3" />
                    {item.dueOffsetDays}d before
                  </span>
                  <button
                    onClick={() => removeChecklistItem(item.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove task"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BudgetTab() {
  const { budget, addBudgetItem, updateBudgetItem, removeBudgetItem, weddingPlan } = useMarketplace()
  const [newLabel, setNewLabel] = useState('')
  const [newCategory, setNewCategory] = useState(BUDGET_CATEGORIES[0])
  const [newEstimated, setNewEstimated] = useState('')

  const totalEstimated = budget.reduce((s, b) => s + b.estimated, 0)
  const totalActual = budget.reduce((s, b) => s + b.actual, 0)
  const totalPaid = budget.filter((b) => b.paid).reduce((s, b) => s + b.actual, 0)
  const planBudget = weddingPlan.totalBudget || 0
  const remaining = planBudget - totalActual
  const overBudget = planBudget > 0 && totalActual > planBudget

  const byCategory = useMemo(() => {
    const groups: Record<string, { estimated: number; actual: number; items: typeof budget }> = {}
    budget.forEach((b) => {
      if (!groups[b.category]) groups[b.category] = { estimated: 0, actual: 0, items: [] }
      groups[b.category].estimated += b.estimated
      groups[b.category].actual += b.actual
      groups[b.category].items.push(b)
    })
    return groups
  }, [budget])

  const loadSuggested = () => {
    if (planBudget <= 0) {
      toast.error('Pehle "Wedding Details" mein total budget set karein')
      return
    }
    BUDGET_ALLOCATION.forEach((a) => {
      addBudgetItem({
        category: a.category,
        label: `${a.category} (suggested)`,
        estimated: Math.round((planBudget * a.percent) / 100),
        actual: 0,
        paid: false,
      })
    })
    toast.success('Suggested budget breakdown added!')
  }

  return (
    <div className="space-y-4">
      {/* Budget overview */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="border-border/60 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Total Budget</div>
          <div className="mt-1 font-serif text-2xl font-bold text-foreground">
            {formatPKRShort(planBudget)}
          </div>
        </Card>
        <Card className="border-border/60 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Spent / Estimated</div>
          <div className="mt-1 font-serif text-2xl font-bold text-primary">
            {formatPKRShort(Math.max(totalActual, totalEstimated))}
          </div>
        </Card>
        <Card className={cn('border p-4', overBudget ? 'border-destructive/40 bg-destructive/5' : 'border-border/60')}>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Remaining</div>
          <div className={cn('mt-1 font-serif text-2xl font-bold', overBudget ? 'text-destructive' : 'text-emerald-600')}>
            {planBudget > 0 ? formatPKRShort(remaining) : '—'}
          </div>
          {overBudget && (
            <div className="mt-1 flex items-center gap-1 text-[10px] text-destructive">
              <AlertCircle className="h-3 w-3" /> Over budget!
            </div>
          )}
        </Card>
      </div>

      {planBudget > 0 && (
        <Card className="border-border/60 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Budget utilization</span>
            <span className="text-xs font-medium text-foreground">
              {Math.min(100, Math.round((totalActual / planBudget) * 100))}%
            </span>
          </div>
          <Progress
            value={Math.min(100, (totalActual / planBudget) * 100)}
            className="h-2"
          />
        </Card>
      )}

      {/* Add budget item */}
      <Card className="border-border/60 p-4">
        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
          <div>
            <Label className="text-xs">Label</Label>
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g. Photographer advance"
              className="mt-1"
            />
          </div>
          <div className="w-full sm:w-36">
            <Label className="text-xs">Category</Label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {BUDGET_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-28">
            <Label className="text-xs">Est. (PKR)</Label>
            <Input
              type="number"
              value={newEstimated}
              onChange={(e) => setNewEstimated(e.target.value)}
              placeholder="50000"
              className="mt-1"
            />
          </div>
          <Button
            onClick={() => {
              if (!newLabel.trim()) {
                toast.error('Label zaroori hai')
                return
              }
              addBudgetItem({
                category: newCategory,
                label: newLabel.trim(),
                estimated: parseInt(newEstimated) || 0,
                actual: 0,
                paid: false,
              })
              setNewLabel('')
              setNewEstimated('')
              toast.success('Budget item added')
            }}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
        {budget.length === 0 && planBudget > 0 && (
          <Button variant="outline" size="sm" className="mt-3" onClick={loadSuggested}>
            <Sparkles className="mr-1.5 h-4 w-4" /> Load suggested breakdown
          </Button>
        )}
      </Card>

      {/* Budget by category */}
      <div className="space-y-3">
        {Object.entries(byCategory).map(([cat, data]) => (
          <Card key={cat} className="border-border/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{cat}</h4>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  {formatPKRShort(data.actual || data.estimated)}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {data.items.length} item{data.items.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {data.items.map((item) => (
                <div key={item.id} className="group flex items-center gap-2 rounded-md border border-border/40 bg-card px-3 py-2">
                  <Checkbox
                    checked={item.paid}
                    onCheckedChange={(v) => updateBudgetItem(item.id, { paid: !!v })}
                    className="border-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={cn('text-sm font-medium truncate', item.paid && 'text-muted-foreground line-through')}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Est: {formatPKRShort(item.estimated)}
                      {item.actual > 0 && ` · Actual: ${formatPKRShort(item.actual)}`}
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={item.actual || ''}
                    onChange={(e) => updateBudgetItem(item.id, { actual: parseInt(e.target.value) || 0 })}
                    placeholder="Actual"
                    className="h-7 w-24 text-xs"
                  />
                  <button
                    onClick={() => removeBudgetItem(item.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        ))}
        {budget.length === 0 && planBudget === 0 && (
          <Card className="border-dashed border-border/60 p-8 text-center">
            <Wallet className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-2 text-sm text-muted-foreground">
              Budget track karne ke liye items add karein ya suggested breakdown load karein.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

function GuestListTab() {
  const { guests, addGuest, updateGuest, removeGuest } = useMarketplace()
  const [newName, setNewName] = useState('')
  const [newSide, setNewSide] = useState<'bride' | 'groom' | 'common'>('common')
  const [newGroup, setNewGroup] = useState(GUEST_GROUPS[0])
  const [filter, setFilter] = useState<'all' | 'pending' | 'yes' | 'no'>('all')

  const filtered = filter === 'all' ? guests : guests.filter((g) => g.rsvp === filter)
  const totalGuests = guests.length + guests.filter((g) => g.plusOne && g.rsvp === 'yes').length
  const confirmed = guests.filter((g) => g.rsvp === 'yes').length
  const pending = guests.filter((g) => g.rsvp === 'pending').length
  const declined = guests.filter((g) => g.rsvp === 'no').length

  const byGroup = useMemo(() => {
    const groups: Record<string, typeof guests> = {}
    filtered.forEach((g) => {
      if (!groups[g.group]) groups[g.group] = []
      groups[g.group].push(g)
    })
    return groups
  }, [filtered])

  const rsvpBadge = (rsvp: string) => {
    if (rsvp === 'yes') return <Badge className="bg-emerald-500/15 text-emerald-700">✓ Coming</Badge>
    if (rsvp === 'no') return <Badge className="bg-rose-500/15 text-rose-700">✗ Can't make it</Badge>
    return <Badge variant="secondary">Pending</Badge>
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-border/60 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Total (+1s)</div>
          <div className="mt-1 font-serif text-2xl font-bold text-foreground">{totalGuests}</div>
        </Card>
        <Card className="border-border/60 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Confirmed</div>
          <div className="mt-1 font-serif text-2xl font-bold text-emerald-600">{confirmed}</div>
        </Card>
        <Card className="border-border/60 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Pending</div>
          <div className="mt-1 font-serif text-2xl font-bold text-amber-600">{pending}</div>
        </Card>
        <Card className="border-border/60 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Declined</div>
          <div className="mt-1 font-serif text-2xl font-bold text-rose-600">{declined}</div>
        </Card>
      </div>

      {/* Add guest */}
      <Card className="border-border/60 p-4">
        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
          <div>
            <Label className="text-xs">Guest name</Label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newName.trim()) {
                  addGuest({ name: newName.trim(), side: newSide, group: newGroup, rsvp: 'pending', plusOne: false })
                  setNewName('')
                  toast.success('Guest added')
                }
              }}
              placeholder="e.g. Uncle Rashid"
              className="mt-1"
            />
          </div>
          <div className="w-full sm:w-32">
            <Label className="text-xs">Side</Label>
            <Select value={newSide} onValueChange={(v) => setNewSide(v as 'bride' | 'groom' | 'common')}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bride">Bride</SelectItem>
                <SelectItem value="groom">Groom</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-40">
            <Label className="text-xs">Group</Label>
            <Select value={newGroup} onValueChange={setNewGroup}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {GUEST_GROUPS.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              if (!newName.trim()) {
                toast.error('Naam zaroori hai')
                return
              }
              addGuest({ name: newName.trim(), side: newSide, group: newGroup, rsvp: 'pending', plusOne: false })
              setNewName('')
              toast.success('Guest added')
            }}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(['all', 'pending', 'yes', 'no'] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f === 'all' ? 'All' : f === 'yes' ? 'Confirmed' : f === 'no' ? 'Declined' : 'Pending'}
          </Button>
        ))}
      </div>

      {/* Guest list by group */}
      <div className="space-y-3">
        {Object.entries(byGroup).map(([group, items]) => (
          <Card key={group} className="border-border/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{group}</h4>
              <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
            </div>
            <div className="space-y-1.5 max-h-80 overflow-y-auto custom-scrollbar">
              {items.map((guest) => (
                <div
                  key={guest.id}
                  className="group flex items-center gap-2 rounded-md border border-border/40 bg-card px-3 py-2"
                >
                  <div className={cn(
                    'grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-xs font-semibold',
                    guest.side === 'bride' ? 'bg-rose-500/15 text-rose-700' :
                    guest.side === 'groom' ? 'bg-primary/15 text-primary' :
                    'bg-accent text-accent-foreground'
                  )}>
                    {guest.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {guest.name}
                      {guest.plusOne && <span className="ml-1 text-[10px] text-muted-foreground">+1</span>}
                    </div>
                    <div className="text-[10px] text-muted-foreground capitalize">{guest.side} side</div>
                  </div>
                  <Select
                    value={guest.rsvp}
                    onValueChange={(v) => updateGuest(guest.id, { rsvp: v as 'pending' | 'yes' | 'no' })}
                  >
                    <SelectTrigger className="h-7 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="yes">✓ Coming</SelectItem>
                      <SelectItem value="no">✗ Decline</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    onClick={() => removeGuest(guest.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove guest"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        ))}
        {guests.length === 0 && (
          <Card className="border-dashed border-border/60 p-8 text-center">
            <Users className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-2 text-sm text-muted-foreground">
              Apne mehmaan list add karein — RSVP track karein, plus-ones count karein.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

export function PlanView() {
  const [tab, setTab] = useState('overview')

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <section className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3 w-3" /> Free Planning Tools
            </Badge>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Apni shaadi plan karein —{' '}
            <span className="text-primary">sab kuch ek jagah</span>
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Countdown timer, wedding checklist, budget tracker aur guest list manager.
            Sab data aapke browser mein save hota hai — private aur secure.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar: setup + countdown */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <CountdownHero />
            <PlanSetupCard />
          </aside>

          {/* Main: tabs */}
          <div>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="checklist" className="text-xs sm:text-sm">
                  <CheckSquare className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Checklist</span>
                </TabsTrigger>
                <TabsTrigger value="budget" className="text-xs sm:text-sm">
                  <Wallet className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Budget</span>
                </TabsTrigger>
                <TabsTrigger value="guests" className="text-xs sm:text-sm">
                  <Users className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Guests</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="checklist" className="mt-4">
                <ChecklistTab />
              </TabsContent>
              <TabsContent value="budget" className="mt-4">
                <BudgetTab />
              </TabsContent>
              <TabsContent value="guests" className="mt-4">
                <GuestListTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
